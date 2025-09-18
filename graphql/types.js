const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    favorecidos: [String!]
  }

  type Transfer {
    from: String!
    to: String!
    value: Float!
    date: String
  }

  type AuthPayload {
    username: String!
    favorecidos: [String!]
    token: String!
  }

  type Query {
    users: [User!]
    transfers: [Transfer!]
  }

  type Mutation {
    register(username: String!, password: String!, favorecidos: [String!]): User!
    login(username: String!, password: String!): AuthPayload!
    transfer(from: String!, to: String!, value: Float!): Transfer!
  }
`;

module.exports = typeDefs;
