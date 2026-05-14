export const typeDefs = `#graphql

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type DeleteResult {
    success: Boolean!
    message: String!
  }

  type Query {
    getAllUsers: [User!]!
    getAllPosts: [Post!]!
    getAllComments: [Comment!]!

    getUserById(id: ID!): User
    getPostById(id: ID!): Post
    getCommentById(id: ID!): Comment

    getPostsByUser(userId: ID!): [Post!]!
    getUserByPost(postId: ID!): User
    getCommentsByPost(postId: ID!): [Comment!]!
    getPostByComment(commentId: ID!): Post
  }

  type Mutation {
    addUser(name: String!, email: String!, age: Int): User!
    updateUser(id: ID!, name: String, email: String, age: Int): User
    deleteUser(id: ID!): DeleteResult!

    addPost(title: String!, body: String!, authorId: ID!): Post!
    updatePost(id: ID!, title: String, body: String): Post
    deletePost(id: ID!): DeleteResult!

    addComment(text: String!, authorId: ID!, postId: ID!): Comment!
    updateComment(id: ID!, text: String!): Comment
    deleteComment(id: ID!): DeleteResult!
  }
`;