import { IResolvers } from 'apollo-server-express';
import { issues } from '../issues';
import { projects } from '../projects';

export const resolvers: IResolvers = {
  Query: {
    issues: () => issues,
    projects: () => projects
  },
  Mutation: {
    deleteIssue: (_root: undefined, { id }: { id: string }) => {
      return issues.filter((iss) => iss.id === id)[0];
    },
    deleteProject: (_root: undefined, { id }: { id: string }) => {
      return projects.filter((proj) => proj.id === id)[0];
    }
  }
};
