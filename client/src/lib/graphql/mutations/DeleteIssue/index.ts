import { gql } from 'apollo-boost';

export const DELETE_ISSUE = gql`
  mutation DeleteIssue($input: DeleteIssueInput!) {
    deleteIssue(input: $input) {
      id
    }
  }
`;
