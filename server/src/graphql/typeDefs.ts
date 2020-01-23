import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Project {
    name: String!
    id: ID!
    issues: [Issue!]
    lead: ID!
  }

  type User {
    id: ID!
    name: String!
  }

  type Issue {
    title: String!
    project: ID!
    description: String!
    author: ID!
    id: ID!
    status: String!
  }

  type Query {
    issues: [Issue!]
    projects: [Project!]
  }

  type Mutation {
    deleteIssue(issueId: ID!): Issue!
    deleteProject(projectId: ID!): Project!
  }
`;
