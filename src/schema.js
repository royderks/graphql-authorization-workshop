const { gql } = require('apollo-server-express');

module.exports = gql`
  enum Role {
    ADMIN
    EDITOR
  }

  directive @auth(isAuthenticated: Boolean, role: Role) on FIELD_DEFINITION

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User
    published: Boolean! # unpublished posts are only visible to editors and admins
    views: Int @auth(isAuthenticated: true, role: ADMIN) # this field should only be visible to admins
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    name: String!
    age: Float
    email: String
    posts: [Post]
  }

  type Credentials {
    token: String
  }

  type Query {
    users: [User]
    posts: [Post]
  }

  type Mutation {
    loginUser(userName: String!, password: String!): Credentials
  }
`;
