const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    books(_id: String): [Book]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: String!): Book
    removeBook(bookId: String!): Book
  }


`;

module.exports = typeDefs;
