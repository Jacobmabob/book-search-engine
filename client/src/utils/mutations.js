import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            email
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: bookInput!) {
    saveBook(bookData: $bookData) {
        _id
        username
        email
        savedBooks {
            authors
            description
            bookId
            title
            bookId
            image
            link
        }
    }
}
`;

// export const REMOVE_BOOK = gql`
// mutation removeBook($bookId: String!) {
//     removeBook(bookId: $bookId) {
    
//     }
// }
// `;