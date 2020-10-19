const { AuthenticationError, UserInputError } = require('apollo-server');

// Models
const Post = require('../../models/Post');

// Utils
const { checkAuth } = require('../../utils/utils');

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });

                return posts;
            } catch (error) {
                throw new Error(error);
            }
        },

        async getPost(parent, args, context, info) {
            try {
                const post = await Post.findById(args.postId);

                if (post) {
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (error) {
                throw new Error(error);
            }
        }
    },

    Mutation: {
        async createPost(parent, args, context, info) {
            const user = checkAuth(context);

            if (args.body.trim() === '') {
                throw new Error('Post body must not be empty');
            }

            const newPost = new Post({
                body: args.body,
                user: user.id,
                username: user.username
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', { newPost: post });

            return post;
        },

        async deletePost(parent, { postId }, context, info) {
            const user = checkAuth(context);

            try {
                const post = await Post.findById(postId);

                // If the owner of the post is equal to the user
                if (user.username === post.username) {
                    await post.delete();

                    return 'Post deleted successfully';
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch (error) {
                throw new Error(error);
            }
        },

        async likePost(parent, { postId }, context, info) {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);

            // If post exist
            if (post) {
                // If the user already liked this post
                if (post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter(like => like.username !== username);
                } // Else the user haven't yet liked this post
                else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    });
                }

                await post.save();

                return post;
            } else {
                throw new UserInputError('Post not found');
            }
        }
    },

    Subscription: {
        newPost: {
            subscribe: (parent, args, { pubsub }, info) => {
                return pubsub.asyncIterator('NEW_POST');
            }
        }
    }
};
