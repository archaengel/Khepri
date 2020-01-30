import { IResolvers } from 'apollo-server-express';
import { Prisma, Issue } from '../../__generated__/prisma-client';

export const issueResolvers: IResolvers = {
  Query: {
    issue: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Issue | null> => {
      return await prisma.issue({ id });
    },
    issuesByProject: async (
      _root: undefined,
      { projectId }: { projectId: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Issue[]> => {
      return await prisma.project({ id: projectId }).issues();
    }
  },
  Mutation: {
    deleteIssue: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Issue> => {
      return await prisma.deleteIssue({ id });
    }
  },
  Issue: {
    id: (issue: Issue): string => issue.id
  }
};
