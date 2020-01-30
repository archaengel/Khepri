import { Prisma, Comment } from '../../__generated__/prisma-client';
import { IResolvers } from 'apollo-server-express';

export const commnetResolvers: IResolvers = {
  Query: {
    comment: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Comment | null> => {
      return await prisma.comment({ id });
    },
    commentByIssue: async (
      _root: undefined,
      { issueId }: { issueId: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Comment[]> => {
      return await prisma.issue({ id: issueId }).comments();
    }
  },
  Mutation: {
    deleteComment: async (
      _root: undefined,
      { commentId }: { commentId: string },
      { prisma }: { prisma: Prisma }
    ): Promise<Comment> => {
      return await prisma.deleteComment({ id: commentId });
    }
  }
};
