import { gql } from 'apollo-boost';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($input: DeleteProjectInput!) {
    deleteProject(input: $input) {
      id
    }
  }
`;
