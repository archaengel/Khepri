import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Project {
    name: String!
    id: ID!
    issueIds: [ID!]
    lead: ID!
  }

  type User {
    id: ID!
    name: String!
  }

  type Issue {
    title: String!
    content: String!
    authorId: ID!
    id: ID!
    status: String!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    issue(id: ID!): Issue
    issuesByProject(issueIds: [ID!]): [Issue]
    projects(leadId: ID!): [Project]
  }

  type Mutation {
    deleteUser(userId: ID!): User!
    deleteIssue(issueId: ID!): Issue!
    deleteProject(projectId: ID!): Project!
  }
`;
