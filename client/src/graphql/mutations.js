import gql from 'graphql-tag';

export const REGISTER_USER = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
        register(registrationInput: { username: $username, email: $email, password: $password, confirmPassword: $confirmPassword }) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
        }
    }
`;

export const CREATE_POST = gql`
    mutation CreatePost($body: String!) {
        createPost(body: $body) {
            id
            body
            username
            createdAt
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
            likes {
                id
                username
                createdAt
            }
            likeCount
        }
    }
`;

export const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id
                username
            }
            likeCount
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deletePost(postId: $postId)
    }
`;

export const CREATE_COMMENT = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            comments {
                id
                body
                username
                createdAt
            }
            commentCount
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation DeleteComment($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId) {
            id
            comments {
                id
                username
                body
                createdAt
            }
            commentCount
        }
    }
`;
