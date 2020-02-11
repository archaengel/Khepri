/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { CreateIssueInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: CreateIssue
// ====================================================

export interface CreateIssue_createIssue {
  __typename: "Issue";
  id: string;
}

export interface CreateIssue {
  createIssue: CreateIssue_createIssue;
}

export interface CreateIssueVariables {
  input: CreateIssueInput;
}
