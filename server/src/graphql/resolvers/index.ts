import merge from 'lodash.merge';
import { userResolvers } from './User';
import { issueResolvers } from './Issue';
import { projectResolvers } from './Project';

export const resolvers = merge(userResolvers, issueResolvers, projectResolvers);
