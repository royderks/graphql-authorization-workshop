const db = require('./database');
const { createUserToken } = require('./authentication');

function getUsers() {
  const users = Array.from(db.users.values());

  return users;
}

function getPosts(_, {}, { isAuthenticated }) {
  const posts = Array.from(db.posts.values());

  if (!isAuthenticated) {
    return posts.filter(({ published }) => published === true);
  }

  return posts;
}

function getPostsByUser({ id }) {
  const posts = Array.from(db.posts.values());

  return posts.filter(({ authorId }) => authorId === id);
}

function getAuthorForPost({ authorId }) {
  return db.users.get(authorId);
}

function computeName(user) {
  return `${user.firstName} ${user.lastName}`;
}

const resolvers = {
  User: {
    name: computeName,
    posts: getPostsByUser,
  },
  Post: {
    author: getAuthorForPost,
  },
  Query: {
    users: getUsers,
    posts: getPosts,
  },
  Mutation: {
    loginUser: createUserToken,
  },
};

module.exports = resolvers;
