import { gql } from '@apollo/client';


export const QUERY_ME = gql`
  query me($id: ID!) {
    me(id: $id) {
      _id
      username
      email
    }
  }
`;

export const searchGoogleBooks = (query) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  };