/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteProjectInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteProject
// ====================================================

export interface DeleteProject_deleteProject {
  __typename: "Project";
  id: string;
}

export interface DeleteProject {
  deleteProject: DeleteProject_deleteProject;
}

export interface DeleteProjectVariables {
  input: DeleteProjectInput;
}
