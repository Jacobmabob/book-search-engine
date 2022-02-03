const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    password: String
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  input BookInput {
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
    me: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookToSave: BookInput): User
    removeBook(bookId: String!): User
  }


`;

module.exports = typeDefs;
