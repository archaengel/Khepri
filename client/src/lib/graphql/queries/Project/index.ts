import { gql } from 'apollo-boost';

export const PROJECT = gql`
  query Project($id: ID!) {
    project(id: $id) {
      name
      statuses
      issues {
        title
        content
        id
        status
      }
      lead {
        name
      }
    }
  }
`;
