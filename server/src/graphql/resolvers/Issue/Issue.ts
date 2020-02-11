import { IResolvers } from 'apollo-server-express';
import { Prisma, Issue } from '../../../__generated__/prisma-client';
import { CreateIssueArgs, UpdateIssueArgs, DeleteIssueArgs } from './types';
import { authorize } from '../../../lib/utils';
import { Request } from 'express';

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
      { input }: DeleteIssueArgs,
      { prisma, req }: { prisma: Prisma; req: Request }
    ): Promise<Issue> => {
      const { id } = input;
      const viewer = await authorize(prisma, req);

      if (!viewer) {
        throw new Error('viewer cannot be found');
      }

      return await prisma.deleteIssue({ id });
    },
    updateIssue: async (
      _root: undefined,
      { input }: UpdateIssueArgs,
      { prisma, req }: { prisma: Prisma; req: Request }
    ): Promise<Issue> => {
      const { title, status, content, id } = input;

      const viewer = await authorize(prisma, req);

      if (!viewer) {
        throw new Error('viewer cannot be found');
      }

      return await prisma.updateIssue({
        where: { id },
        data: {
          title,
          content,
          status
        }
      });
    },
    createIssue: async (
      _root: undefined,
      { input }: CreateIssueArgs,
      { prisma, req }: { prisma: Prisma; req: Request }
    ): Promise<Issue> => {
      const { title, status, content, projectId } = input;

      const viewer = await authorize(prisma, req);
      if (!viewer) {
        throw new Error('viewer cannot be found');
      }

      const project = await prisma.project({ id: projectId });
      const projectLead = await prisma.project({ id: projectId }).lead();
      if (!project) {
        throw new Error('project cannot be found');
      }

      if (viewer.id !== projectLead.id) {
        throw new Error('only lead can create issues');
      }

      return prisma.createIssue({
        title,
        content,
        project: { connect: { id: projectId } },
        author: { connect: { id: viewer.id } },
        status
      });
    }
  },
  Issue: {
    id: (issue: Issue): string => issue.id
  }
};
