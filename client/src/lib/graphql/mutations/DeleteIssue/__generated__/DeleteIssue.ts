/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteIssueInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteIssue
// ====================================================

export interface DeleteIssue_deleteIssue {
  __typename: "Issue";
  id: string;
}

export interface DeleteIssue {
  deleteIssue: DeleteIssue_deleteIssue;
}

export interface DeleteIssueVariables {
  input: DeleteIssueInput;
}
