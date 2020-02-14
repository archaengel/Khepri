/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateIssueInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateIssue
// ====================================================

export interface UpdateIssue_updateIssue {
  __typename: "Issue";
  id: string;
  content: string;
  title: string;
}

export interface UpdateIssue {
  updateIssue: UpdateIssue_updateIssue;
}

export interface UpdateIssueVariables {
  input: UpdateIssueInput;
}
