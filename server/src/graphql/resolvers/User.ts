import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Prisma, User } from '../../__generated__/prisma-client';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: { id: string },
      { prisma }: { prisma: Prisma }
    ): Promise<User | null> => {
      return await prisma.user({ id });
    },
    users: async (
      _root: undefined,
      _args: {},
      { prisma }: { prisma: Prisma }
    ): Promise<User[]> => {
      return await prisma.users();
    }
  },
  Mutation: {
    deleteUser: async (
      _root: undefined,
      { userId }: { userId: string },
      { prisma }: { prisma: Prisma }
    ): Promise<User> => {
      return await prisma.deleteUser({ id: userId });
    }
  },
  User: {
    id: (user: User): string => user.id
  }
};
