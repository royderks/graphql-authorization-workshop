const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require('apollo-server-core');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { isTokenValid } = require('./authentication');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;
  
      return {
        token,
        isAuthenticated: !!isTokenValid(token || ''),
      };
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  // Wait until server is created and started
  await server.start();

  const app = express();
  server.applyMiddleware({ app });


  const PORT = 4000;

  app.listen(PORT, () => {
    console.log(
      `GraphQL endpoint and playground available at http://localhost:${PORT}${server.graphqlPath}`,
    );
  });
}

startApolloServer();