import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Project {
    name: String!
    id: ID!
    issues: [Issue!]!
    statuses: [String!]!
    lead: User!
  }

  type User {
    id: ID!
    name: String!
    contact: String!
    avatar: String!
    token: String
    projects: [Project!]!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    didRequest: Boolean!
    projects: [Project!]!
  }

  type Issue {
    title: String!
    content: String!
    author: User!
    id: ID!
    status: String!
    project: Project!
    comments: [Comment!]!
  }

  type Comment {
    id: String!
    author: User!
    content: String!
    issue: Issue!
  }

  input LogInInput {
    code: String!
  }

  input CreateIssueInput {
    title: String!
    content: String!
    projectId: ID!
    status: String!
  }

  input UpdateIssueInput {
    id: ID!
    title: String!
    content: String!
    status: String!
  }

  input DeleteIssueInput {
    id: ID!
  }

  input UpdateProjectStatusesInput {
    projectId: ID!
    statuses: [String!]!
  }

  input CreateProjectInput {
    name: String!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User
    users: [User]
    issue(id: ID!): Issue
    issuesByProject(projectId: ID!): [Issue!]!
    project(id: ID!): Project
    projectsByLead(leadId: ID!): [Project!]!
    comment(id: ID!): Comment
    commentsByIssue(issueId: ID!): [Comment!]!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    createIssue(input: CreateIssueInput!): Issue!
    updateIssue(input: UpdateIssueInput!): Issue!
    createProject(input: CreateProjectInput!): Project!
    updateProjectStatuses(input: UpdateProjectStatusesInput!): Project!
    deleteUser(userId: ID!): User!
    deleteIssue(input: DeleteIssueInput!): Issue!
    deleteProject(projectId: ID!): Project!
    deleteComment(commentId: ID!): Comment!
  }
`;
