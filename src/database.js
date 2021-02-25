const ROLE = {
  ADMIN: 'ADMIN',
  EDITOR: 'EDITOR',
};

class User {
  id;
  firstName;
  lastName;
  age;
  email;
  role;

  constructor(id, firstName, lastName, age, email, role) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    this.role = role;
  }
}

class Post {
  id;
  authorId;
  title;
  body;
  published;
  views;

  constructor(id, authorId, title, body, published, views) {
    this.id = id;
    this.authorId = authorId;
    this.title = title;
    this.body = body;
    this.published = published;
    this.views = views;
  }
}

// Mock database tables
const posts = new Map();
const users = new Map();

// Seed initial posts
posts.set(1, new Post(1, 1, 'First post', 'Lorem Ipsum...', true, 100));
posts.set(2, new Post(2, 2, 'Second post', 'Lorem Ipsum...', false, 0));

// Seed initial users
users.set(1, new User(1, 'Alice', 'Foo', 38, 'editor@newline.co', ROLE.EDITOR));
users.set(2, new User(2, 'Bob', 'Bar', 27, 'admin@newline.co', ROLE.ADMIN));

// Export the seeded tables
const database = {
  posts,
  users,
};

module.exports = database;
