/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateIssueInput {
  title: string;
  content: string;
  projectId: string;
  status: string;
}

export interface CreateProjectInput {
  name: string;
}

export interface DeleteIssueInput {
  id: string;
}

export interface DeleteProjectInput {
  id: string;
}

export interface LogInInput {
  code: string;
}

export interface UpdateIssueInput {
  id: string;
  title: string;
  content: string;
  status: string;
}

export interface UpdateProjectStatusesInput {
  projectId: string;
  statuses: string[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
