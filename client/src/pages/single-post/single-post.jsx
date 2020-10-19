import React, { memo, useContext, useState, useRef } from 'react';

// Apollo
import { useMutation, useQuery } from '@apollo/react-hooks';
import { GET_POST } from '../../graphql/queries';
import { CREATE_COMMENT } from '../../graphql/mutations';

// Context
import { AuthContext } from '../../context/auth.context';

// Semantic Components
import { Card, Grid, Image, Button, Label, Icon, Form } from 'semantic-ui-react';
import moment from 'moment';

// Components
import LikeButton from '../../components/like-button/like-button';
import DeleteButton from '../../components/delete-button/delete-button';

const SinglePost = ({ match, history }) => {
    const postId = match.params.postId;

    const [comment, setComment] = useState('');

    const { user } = useContext(AuthContext);

    const commentInputRef = useRef(null);

    const { data } = useQuery(GET_POST, {
        variables: {
            postId
        }
    });

    const [submitComment] = useMutation(CREATE_COMMENT, {
        update() {
            // Reseting the comment field
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postId,
            body: comment
        }
    });

    const post = data && data.getPost;

    let postMarkup;

    const handleDelete = () => {
        history.push('/');
    };

    const handleSubmit = () => {
        submitComment();
    };

    if (!post) {
        postMarkup = <p>Loading post...</p>;
    } else {
        const { id, body, username, createdAt, comments, likes, commentCount, likeCount } = post;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image float='right' size='small' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
                    </Grid.Column>

                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <hr />
                            <Card.Content extra>
                                <LikeButton user={user} post={{ id, likes, likeCount }} />
                                <Button labelPosition='right' as='div'>
                                    <Button color='blue' basic>
                                        <Icon name='comments' />
                                    </Button>
                                    <Label basic color='blue' pointing='left'>
                                        {commentCount}
                                    </Label>
                                </Button>
                                {user && user.username === username && <DeleteButton postId={id} callback={handleDelete} />}
                            </Card.Content>
                        </Card>
                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment: </p>
                                    <Form>
                                        <div className='ui action input fluid'>
                                            <input
                                                type='text'
                                                name='comment'
                                                placeholder='Comment...'
                                                value={comment}
                                                onChange={e => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type='submit' className='ui button teal' disabled={comment.trim() === ''} onClick={handleSubmit}>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}
                        {comments.map(comment => (
                            <Card fluid key={comment.id}>
                                <Card.Content>
                                    {user && user.username === comment.username && <DeleteButton postId={id} commentId={comment.id} />}
                                    <Card.Header>{comment.username}</Card.Header>
                                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comment.body}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
};

export default memo(SinglePost);
