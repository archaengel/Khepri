import { IResolvers } from 'apollo-server-express';
import {
  Prisma,
  Project,
  User,
  prisma,
  Issue
} from '../../../__generated__/prisma-client';
import {
  UpdateProjectStatusesArgs,
  CreateProjectArgs,
  DeleteProjectArgs
} from './types';
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
      console.log('hi');
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
          },
          issues: {
            create: [
              {
                title: 'New Items Start Here',
                content:
                  "All new items begin are created and begin here, in 'Backlog'.",
                status: 'Backlog',
                author: { connect: { id: viewer.id } }
              },
              {
                title: 'Items are Ready',
                content:
                  "Items which are ready to be developed are moved here from 'Backlog'.",
                status: 'Ready for Dev',
                author: { connect: { id: viewer.id } }
              },
              {
                title: 'Working on It',
                content:
                  "Items which are actively being developed are moved here from 'Ready for Dev'",
                status: 'In Progress',
                author: { connect: { id: viewer.id } }
              },
              {
                title: 'All Done',
                content:
                  "Items which are no longer being developed and are ready for production end up here, after 'In Progress'",
                status: 'Completed',
                author: { connect: { id: viewer.id } }
              }
            ]
          }
        });

        return project;
      } catch (error) {
        throw new Error(`failed to create new project: ${error}`);
      }
    },
    deleteProject: async (
      _root: undefined,
      { input }: DeleteProjectArgs,
      { prisma, req }: { prisma: Prisma; req: Request }
    ): Promise<Project> => {
      try {
        const { id } = input;
        const viewer = await authorize(prisma, req);
        if (!viewer) {
          throw new Error('viewer cannot be found');
        }

        const project = await prisma.project({ id });
        if (!project) {
          throw new Error('project cannout be found');
        }

        const lead = await prisma.project({ id }).lead();
        if (!lead) {
          throw new Error('project lead cannout be found');
        }

        if (lead.id !== viewer.id) {
          throw new Error('only project lead can delete project');
        }

        const deletedIssues = await prisma.deleteManyIssues({
          project: { id: project.id }
        });
        const deletedProject = await prisma.deleteProject({ id });
        return deletedProject;
      } catch (error) {
        throw new Error(`Failed to delete project: ${error}`);
      }
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
