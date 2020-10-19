const { UserInputError, AuthenticationError } = require('apollo-server');

// Models
const Post = require('../../models/Post');

// Utils
const { checkAuth } = require('../../utils/utils');

module.exports = {
    Mutation: {
        createComment: async (parent, { postId, body }, context, info) => {
            const user = checkAuth(context);

            if (body.trim() === '') {
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comment body must not be empty'
                    }
                });
            }

            const post = await Post.findById(postId);

            if (post) {
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                });

                await post.save();

                return post;
            } else {
                throw new UserInputError('Post not found');
            }
        },

        deleteComment: async (parent, { postId, commentId }, context, info) => {
            const { username } = checkAuth(context);

            // Finding the post
            const post = await Post.findById(postId);

            // If post exist
            if (post) {
                // Finding its index in the comments array
                const commentIndex = post.comments.findIndex(c => c.id === commentId);

                // If the user is the owner of the comment
                if (post.comments[commentIndex].username === username) {
                    post.comments = post.comments.filter(c => c.id !== commentId);

                    await post.save();

                    return post;
                } else {
                    throw new AuthenticationError('Action not allowd');
                }
            } else {
                throw new UserInputError('Post not found');
            }
        }
    }
};
