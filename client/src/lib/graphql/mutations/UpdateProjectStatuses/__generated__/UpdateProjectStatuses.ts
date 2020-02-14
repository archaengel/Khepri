/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateProjectStatusesInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateProjectStatuses
// ====================================================

export interface UpdateProjectStatuses_updateProjectStatuses {
  __typename: "Project";
  id: string;
  statuses: string[];
}

export interface UpdateProjectStatuses {
  updateProjectStatuses: UpdateProjectStatuses_updateProjectStatuses;
}

export interface UpdateProjectStatusesVariables {
  input: UpdateProjectStatusesInput;
}
