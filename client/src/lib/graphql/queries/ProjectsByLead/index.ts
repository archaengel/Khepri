import { gql } from 'apollo-boost';

export const PROJECTS_BY_LEAD = gql`
  query ProjectsByLead($leadId: ID!) {
    projectsByLead(leadId: $leadId) {
      name
    }
  }
`;
