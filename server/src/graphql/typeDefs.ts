import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Project {
    name: String!
    id: ID!
    issues: [Issue]!
    lead: User!
  }

  type User {
    id: ID!
    name: String!
    projects: [Project]!
  }

  type Issue {
    title: String!
    content: String!
    author: User!
    id: ID!
    status: String!
    project: Project!
    comments: [Comment]!
  }

  type Comment {
    id: String!
    author: User!
    content: String!
    issue: Issue!
  }

  type Query {
    user(id: ID!): User
    users: [User]
    issue(id: ID!): Issue
    issuesByProject(projectId: ID!): [Issue]
    project(id: ID!): Project
    projectsByLead(leadId: ID!): [Project]
    comment(id: ID!): Comment
    commentsByIssue(issueId: ID!): [Comment]
  }

  type Mutation {
    deleteUser(userId: ID!): User!
    deleteIssue(issueId: ID!): Issue!
    deleteProject(projectId: ID!): Project!
    deleteComment(commentId: ID!): Comment!
  }
`;
