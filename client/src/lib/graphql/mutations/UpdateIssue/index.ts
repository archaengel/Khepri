import { gql } from 'apollo-boost';

export const UPDATE_ISSUE = gql`
  mutation UpdateIssue($input: UpdateIssueInput!) {
    updateIssue(input: $input) {
      id
      content
      title
    }
  }
`;
