import { IResolvers } from 'apollo-server-express';
import {
  Prisma,
  Project,
  User,
  prisma,
  Issue
} from '../../../__generated__/prisma-client';
import { UpdateProjectStatusesArgs, CreateProjectArgs } from './types';
import { Request } from 'express';
import { authorize } from '../../../lib/utils';

export const projectResolvers: IResolvers = {
  Query: {
    projectsByLead: async (
      _root: undefined,
      { leadId }: { leadId: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Project[]> => {
      return await prisma.user({ id: leadId }).projects();
    },
    project: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Project | null> => {
      return await prisma.project({ id });
    }
  },
  Mutation: {
    createProject: async (
      _root: undefined,
      { input }: CreateProjectArgs,
      { prisma, req }: { prisma: Prisma; req: Request }
    ): Promise<Project> => {
      try {
        const { name } = input;
        const viewer = await authorize(prisma, req);
        if (!viewer) {
          throw new Error('viewer cannot be found');
        }

        const project = await prisma.createProject({
          name,
          lead: { connect: { id: viewer.id } },
          statuses: {
            set: ['Backlog', 'Ready for Dev', 'In Progress', 'Completed']
          }
        });

        return project;
      } catch (error) {
        throw new Error(`failed to create new project: ${error}`);
      }
    },
    deleteProject: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Project> => {
      return await prisma.deleteProject({ id });
    },
    updateProjectStatuses: async (
      _root: undefined,
      { input }: UpdateProjectStatusesArgs,
      { prisma, req }: { prisma: Prisma; req: Request }
    ): Promise<Project> => {
      const { projectId, statuses } = input;
      const viewer = authorize(prisma, req);

      if (!viewer) {
        throw new Error('cannot find viewer');
      }

      const project = await prisma.project({ id: projectId });
      if (!project) {
        throw new Error('cannot find project');
      }

      return await prisma.updateProject({
        data: {
          statuses: { set: statuses }
        },
        where: {
          id: projectId
        }
      });
    }
  },
  Project: {
    id: (project: Project): string => project.id,
    lead: async (project: Project): Promise<User> => {
      return await prisma.project({ id: project.id }).lead();
    },
    issues: async (project: Project): Promise<Issue[]> => {
      return await prisma.project({ id: project.id }).issues();
    }
  }
};
