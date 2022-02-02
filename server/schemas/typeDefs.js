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
    _id: ID!
    description: String
    bookId: String
    image: String
    link: String
    title: String
    authors: [String]
  }

  input BookInput {
    _id: ID!
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
    user(id : ID!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addBook(bookId: String!): Book
    removeBook(bookId: String!): Book
  }


`;

module.exports = typeDefs;
