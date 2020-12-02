## Server-side GraphQL Authentication



### Get started

yarn && yarn start



### Excercises

1. Try running this application, what queries can you use? How can you get the bearer token?

Hint: The credentials are:

```json
{
  "userName": "editor@newline.co",
  "password": "fullstackgraphql"
}
```

2. The schema for our server defines fields for the type `Post`. Add the field `published` for this type and only return unpublished posts for users that are authenticated -- that is, users who pass a user token along with their query. For this you'll use resolver-based authentication.

Hint: How do you get the token in the resolvers? Remember the function `isTokenValid` from the slides?

3. Move the logic for the authentication to the context, and make sure unpublished posts are only visible to authenticated users.

4. In addition to authentication, also add role-based authorization to your GraphQL server. Create a new field called `views` in the schema that's only visible to authenticated users that have the role `ADMIN`.

The admin credentials are:

```json
{
  "userName": "admin@newline.co",
  "password": "fullstackgraphql"
}
```

Hint: Where do you get the id of the user from? How can you use this to get the users' information?

5. Besides the context or the resolvers, we can also use the schema for our authentication logic with a custom directive. Replace the existing logic for authentication with a custom directive. To save you some time, the code for the directive itself is already present in the file `src/directive.ts`.

Hint: You can find more info here https://www.apollographql.com/docs/apollo-server/schema/directives/#using-custom-schema-directives














