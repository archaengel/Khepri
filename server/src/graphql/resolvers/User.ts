import { IResolvers } from 'apollo-server-express';
import { User } from '../../lib/types';
import { ObjectId } from 'mongodb';
import { Database } from '../../lib/types';

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<User | null> => {
      return await db.users.findOne({ _id: new ObjectId(id) });
    },
    users: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<User[]> => {
      return await db.users.find({}).toArray();
    }
  },
  Mutation: {
    deleteUser: async (
      _root: undefined,
      { userId }: { userId: string },
      { db }: { db: Database }
    ): Promise<User> => {
      const deleteRes = await db.users.findOneAndDelete({
        _id: new ObjectId(userId)
      });

      if (!deleteRes.value) {
        throw new Error('failed to delete user');
      }

      return deleteRes.value;
    }
  },
  User: {
    id: (user: User): string => user._id.toString()
  }
};
