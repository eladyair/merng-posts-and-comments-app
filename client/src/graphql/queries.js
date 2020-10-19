import gql from 'graphql-tag';

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            username
            createdAt
            comments {
                id
                username
                body
                createdAt
            }
            commentCount
            likes {
                username
            }
            likeCount
        }
    }
`;

export const GET_POST = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            body
            username
            createdAt
            comments {
                id
                username
                body
                createdAt
            }
            commentCount
            likes {
                username
            }
            likeCount
        }
    }
`;
