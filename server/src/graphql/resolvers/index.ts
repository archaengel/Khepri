import merge from 'lodash.merge';
import { userResolvers } from './User';
import { issueResolvers } from './Issue';
import { projectResolvers } from './Project/Project';
import { viewerResolvers } from './Viewer';

export const resolvers = merge(
  viewerResolvers,
  userResolvers,
  issueResolvers,
  projectResolvers
);
