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

2. The schema for our server defines fields for the type `Post`. Add the fields `published` and `views` for this type that should only be visible to authenticated users -- that is, users who pass a user token along with their query. For this you'll use resolver-based authentication.

Hint: remember the function `isTokenValid` from the slides?












