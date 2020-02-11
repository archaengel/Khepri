/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectsByLead
// ====================================================

export interface ProjectsByLead_projectsByLead {
  __typename: "Project";
  name: string;
}

export interface ProjectsByLead {
  projectsByLead: ProjectsByLead_projectsByLead[];
}

export interface ProjectsByLeadVariables {
  leadId: string;
}
