/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogOut
// ====================================================

export interface LogOut_logOut_projects {
  __typename: "Project";
  id: string;
  name: string;
}

export interface LogOut_logOut {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  projects: LogOut_logOut_projects[];
  didRequest: boolean;
}

export interface LogOut {
  logOut: LogOut_logOut;
}
