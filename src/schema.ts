import { gql } from 'apollo-server-express';

export default gql`
  type Post {
    id: ID!
    title: String!
    body: String!
    author: User
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
