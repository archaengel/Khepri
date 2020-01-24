import { IResolvers } from 'apollo-server-express';
import { ObjectId } from 'mongodb';
import { Database, Project } from '../../lib/types';

export const projectResolvers: IResolvers = {
  Query: {
    projects: async (
      _root: undefined,
      { leadId }: { leadId: string },
      { db }: { db: Database }
    ): Promise<Project[]> => {
      return await db.projects.find({ leadId: new ObjectId(leadId) }).toArray();
    }
  },
  Mutation: {
    deleteProject: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Project> => {
      const deleteRes = await db.projects.findOneAndDelete({
        _id: new ObjectId(id)
      });

      if (!deleteRes.value) {
        throw new Error('failed to delete project');
      }

      return deleteRes.value;
    }
  },
  Project: {
    id: (project: Project): string => project._id.toString()
  }
};
