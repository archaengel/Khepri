/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LogIn
// ====================================================

export interface LogIn_logIn_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface LogIn_logIn {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  didRequest: boolean;
  projects: LogIn_logIn_projects[];
}

export interface LogIn {
  logIn: LogIn_logIn;
}

export interface LogInVariables {
  input?: LogInInput | null;
}
