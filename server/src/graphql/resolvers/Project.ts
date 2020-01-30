import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Prisma, Project } from '../../__generated__/prisma-client';

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
    deleteProject: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Project> => {
      return await prisma.deleteProject({ id });
    }
  },
  Project: {
    id: (project: Project): string => project.id
  }
};
