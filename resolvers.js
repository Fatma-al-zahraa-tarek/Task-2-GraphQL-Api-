import User from "./models/User.js";
import Post from "./models/Post.js";
import Comment from "./models/Comment.js";

export const resolvers = {

  User: {
    posts: (parent) => Post.find({ authorId: parent.id }),
  },

  Post: {
    author: (parent) => User.findById(parent.authorId),
    comments: (parent) => Comment.find({ postId: parent.id }),
  },

  Comment: {
    author: (parent) => User.findById(parent.authorId),
    post: (parent) => Post.findById(parent.postId),
  },

  Query: {
    getAllUsers: () => User.find(),
    getAllPosts: () => Post.find(),
    getAllComments: () => Comment.find(),

    getUserById: (_, { id }) => User.findById(id),
    getPostById: (_, { id }) => Post.findById(id),
    getCommentById: (_, { id }) => Comment.findById(id),

    getPostsByUser: (_, { userId }) => Post.find({ authorId: userId }),

    getUserByPost: async (_, { postId }) => {
      const post = await Post.findById(postId);
      if (!post) throw new Error("Post not found");
      return User.findById(post.authorId);
    },

    getCommentsByPost: (_, { postId }) => Comment.find({ postId }),

    getPostByComment: async (_, { commentId }) => {
      const comment = await Comment.findById(commentId);
      if (!comment) throw new Error("Comment not found");
      return Post.findById(comment.postId);
    },
  },

  Mutation: {
    addUser: (_, { name, email, age }) => User.create({ name, email, age }),

    updateUser: (_, { id, name, email, age }) => {
      return User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    },

    deleteUser: async (_, { id }) => {
      const user = await User.findByIdAndDelete(id);
      if (!user) return { success: false, message: "User not found" };
      return { success: true, message: "User deleted successfully" };
    },

    addPost: (_, { title, body, authorId }) => Post.create({ title, body, authorId }),

    updatePost: (_, { id, title, body }) => {
      return Post.findByIdAndUpdate(id, { title, body }, { new: true });
    },

    deletePost: async (_, { id }) => {
      const post = await Post.findByIdAndDelete(id);
      if (!post) return { success: false, message: "Post not found" };
      return { success: true, message: "Post deleted successfully" };
    },

    addComment: (_, { text, authorId, postId }) => Comment.create({ text, authorId, postId }),

    updateComment: (_, { id, text }) => {
      return Comment.findByIdAndUpdate(id, { text }, { new: true });
    },

    deleteComment: async (_, { id }) => {
      const comment = await Comment.findByIdAndDelete(id);
      if (!comment) return { success: false, message: "Comment not found" };
      return { success: true, message: "Comment deleted successfully" };
    },
  },
};