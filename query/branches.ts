import { gql } from "@apollo/client";

export const GET_BRANCHES = gql`
  query HomePageQuery {
    branches_aggregate(limit: 20) {
      nodes {
        name
        store {
          media
        }
      }
    }
    store_category_aggregate(limit: 20) {
      nodes {
        id
        name
      }
    }
  }
`;
