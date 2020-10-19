import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { LIKE_POST } from '../../graphql/mutations';

// Styles
import './like-button.styles.scss';

// Third Parties
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // If the user who just clicked on "like" already liked this post
        if (user && likes.find(like => like.username === user.username)) {
            setLiked(true);
        } else {
            setLiked(false);
        }
    }, [user, likes]); // Any time the user or the array of likes have changed

    const [likePost] = useMutation(LIKE_POST, {
        onError(err) {
            console.log(err.graphQLErrors[0]);
        },
        variables: { postId: id }
    });

    const handleLikePost = e => {
        if (user) {
            likePost();
        }
    };

    const likeBtn = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='heart' />
                Like
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='heart' />
                Like
            </Button>
        )
    ) : (
        <Button color='teal' basic as={Link} to='/login'>
            <Icon name='heart' />
            Like
        </Button>
    );

    return (
        <Popup
            content={liked ? 'Unlike' : 'Like'}
            inverted
            trigger={
                <Button as='div' labelPosition='right' onClick={handleLikePost}>
                    {likeBtn}
                    <Label basic color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
            }
        />
    );
};

export default LikeButton;
