/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Project
// ====================================================

export interface Project_project_issues {
  __typename: "Issue";
  title: string;
  content: string;
  id: string;
  status: string;
}

export interface Project_project_lead {
  __typename: "User";
  name: string;
}

export interface Project_project {
  __typename: "Project";
  name: string;
  statuses: string[];
  issues: Project_project_issues[];
  lead: Project_project_lead;
}

export interface Project {
  project: Project_project | null;
}

export interface ProjectVariables {
  id: string;
}
