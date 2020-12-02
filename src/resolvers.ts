import db, { Post, User } from './database';
import { createUserToken } from './authentication';

function getUsers(): Array<User> {
  const users = Array.from(db.users.values());

  return users;
}

function getPosts(_: Object, {}): Array<Post> {
  const posts = Array.from(db.posts.values());

  return posts;
}

function getPostsByUser({ id }: User): Array<Post> {
  const posts = Array.from(db.posts.values());

  return posts.filter(({ authorId }) => authorId === id);
}

function getAuthorForPost({ authorId }: Post): User | null {
  return db.users.get(authorId);
}

function computeName(user: User): string {
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

export default resolvers;
