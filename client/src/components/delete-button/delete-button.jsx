import React, { Fragment, useState } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { DELETE_POST, DELETE_COMMENT } from '../../graphql/mutations';
import { FETCH_POSTS_QUERY } from '../../graphql/queries';

// Semantic Components
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';

const DeleteButton = ({ postId, commentId, callback }) => {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrComment] = useMutation(mutation, {
        // On mutation success
        update(proxy) {
            // The delete was successful
            setConfirmOpen(false);

            if (!commentId) {
                // Using proxy as a gate to the apollo cache
                // Getting the data from the cache of the "FETCH_POSTS_QUERY"
                const data = proxy.readQuery({
                    query: FETCH_POSTS_QUERY
                });

                const updatedPosts = data.getPosts.filter(post => post.id !== postId);

                // Updating the cache with the new post
                proxy.writeQuery({
                    query: FETCH_POSTS_QUERY,
                    data: {
                        getPosts: [...updatedPosts] // Updating the existing posts in the cache with the new post that was added
                    }
                });
            }

            callback && callback();
        },
        onError(err) {
            console.log(err.graphQLErrors[0]);
        },
        variables: { postId, commentId }
    });

    const handleDelete = () => {
        deletePostOrComment();
    };

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCancel = () => {
        setConfirmOpen(false);
    };

    return (
        <Fragment>
            <Popup
                content={commentId ? 'Delete comment' : 'Delete post'}
                inverted
                trigger={
                    <Button as='div' color='red' floated='right' style={{ marginTop: 3 }} onClick={handleOpenConfirm}>
                        <Icon name='trash' style={{ margin: 0 }} />
                    </Button>
                }
            />
            <Confirm open={confirmOpen} onCancel={handleCancel} onConfirm={handleDelete}></Confirm>
        </Fragment>
    );
};

export default DeleteButton;
