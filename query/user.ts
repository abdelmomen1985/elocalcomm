import { gql } from "@apollo/client";

export const USER_WISHLIST = gql`
query user_wishlist($user_id: uuid) {
    user_wishlist_aggregate(where: {user_id: 
        {_eq: $user_id}}) {
      nodes {
      }
    }
  }
`;
export const ADD_TO_WISHLIST = gql`
  mutation add_to_wishlist($user_id: uuid, $unit_id: uuid) {
    insert_user_wishlist_one(object: { user_id: $user_id, unit_id: $unit_id }) {
      created_at
    }
  }
`;
export const REMOVE_FROM_WISHLIST = gql`
  mutation remove_from_wishlist($user_id: uuid, $unit_id: uuid) {
    delete_user_wishlist(
      where: { user_id: { _eq: $user_id }, unit_id: { _eq: $unit_id } }
    ) {
      affected_rows
    }
  }
`;
export const NEW_USER = gql`
  mutation sign_up($name: String, $username: String, $password: String) {
    insert_users(
      objects: [{ name: $name, username: $username, passwired: $password }]
    ) {
      affected_rows
    }
  }
`;
