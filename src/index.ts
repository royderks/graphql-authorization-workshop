import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import { isTokenValid } from './authentication';
import db from './database';
import { AuthDirective } from './directives';

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
  schemaDirectives: {
    auth: AuthDirective, // Logic for the directive @auth
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
