import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// Context
import { AuthContext } from '../../context/auth.context';

// Third Parties
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
import moment from 'moment';

// Components
import LikeButton from '../like-button/like-button';
import DeleteButton from '../delete-button/delete-button';

const PostCard = ({ post: { id, username, body, createdAt, likes, likeCount, commentCount } }) => {
    const { user } = useContext(AuthContext);

    return (
        <Card fluid>
            <Card.Content>
                <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <Popup
                    content='Comment on post'
                    inverted
                    trigger={
                        <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
                            <Button color='blue' basic>
                                <Icon name='comments' />
                            </Button>
                            <Label basic color='blue' pointing='left'>
                                {commentCount}
                            </Label>
                        </Button>
                    }
                />

                {user && user.username === username && <DeleteButton postId={id} />}
            </Card.Content>
        </Card>
    );
};

export default PostCard;
