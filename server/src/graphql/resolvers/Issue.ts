import { Issue, Database } from '../../lib/types';
import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';

export const issueResolvers: IResolvers = {
  Query: {
    issue: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Issue | null> => {
      return await db.issues.findOne({ _id: new ObjectId(id) });
    },
    issuesByProject: async (
      _root: undefined,
      { issueIds }: { issueIds: string[] },
      { db }: { db: Database }
    ): Promise<Issue[]> => {
      let result: Issue[] = [];
      for (const id of issueIds) {
        const iss = await db.issues.findOne({ _id: new ObjectId(id) });
        if (iss) {
          result = [...result, iss];
        }
      }
      return result;
    }
  },
  Mutation: {
    deleteIssue: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Issue> => {
      const deleteRes = await db.issues.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error('failed to delete issue');
      }

      return deleteRes.value;
    }
  },
  Issue: {
    id: (issue: Issue): string => issue._id.toString()
  }
};
