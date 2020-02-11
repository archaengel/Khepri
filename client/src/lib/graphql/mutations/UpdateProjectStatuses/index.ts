import { gql } from 'apollo-boost';

export const UPDATE_PROJECT_STATUSES = gql`
  mutation UpdateProjectStatuses($input: UpdateProjectStatusesInput!) {
    updateProjectStatuses(input: $input) {
      id
      statuses
    }
  }
`;
