import React, { memo, useContext } from 'react';

// Apollo
import { useQuery } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../../graphql/queries';

// Context
import { AuthContext } from '../../context/auth.context';

// Styles
import './home.styles.scss';

// Semantic Components
import { Grid, Transition } from 'semantic-ui-react';

// Components
import PostForm from '../../components/post-form/post-form';
import PostCard from '../../components/post-card/post-card';

const Home = () => {
    const { user } = useContext(AuthContext);

    // Destructuring the the values from useQuery and also destructuring the "data" and giving it an alias of "posts"
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    const posts = data && data.getPosts;

    return (
        <Grid columns={3}>
            <Grid.Row centered className='page-title'>
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )}
                {loading ? (
                    <h1>Loading posts...</h1>
                ) : (
                    <Transition.Group>
                        {posts &&
                            posts.map(post => (
                                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                                    <PostCard post={post} />
                                </Grid.Column>
                            ))}
                    </Transition.Group>
                )}
            </Grid.Row>
        </Grid>
    );
};

export default memo(Home);
