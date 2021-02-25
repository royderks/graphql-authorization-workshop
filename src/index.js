const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { isTokenValid } = require('./authentication');
const db = require('./database');
const AuthDirective = require('./directives');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const { userId } = isTokenValid(token || '') || {};
    const user = db.users.get(userId);

    return {
      token,
      isAuthenticated: !!user,
      user,
    };
  },
});

const app = express();
server.applyMiddleware({ app });

const PORT = 4000;

app.listen(PORT, () => {
  console.log(
    `GraphQL endpoint and playground available at http://localhost:${PORT}${server.graphqlPath}`,
  );
});
