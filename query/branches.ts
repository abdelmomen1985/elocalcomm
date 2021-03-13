import { gql } from "@apollo/client";

export const GET_BRANCHES = gql`
  query HomePageQuery($cat_id: Int) {
    branches_aggregate(where: {category_id: {_eq: $cat_id}}, limit: 20) {
      nodes {
        id
        name
        category_id
        lat
        lng
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
