import React, { useState } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { FETCH_POSTS_QUERY } from '../../graphql/queries';
import { CREATE_POST } from '../../graphql/mutations';

// Semantic Components
import { Form, Button } from 'semantic-ui-react';

// Custom Hooks
import { useForm } from '../../custom-hooks/hooks';

const PostForm = () => {
    const { values, handleChange, onSubmit } = useForm(createPostCB, {
        body: ''
    });

    const [error, setError] = useState('');

    const [createPost, results] = useMutation(CREATE_POST, {
        update(proxy, { data: { createPost: post } }) {
            // Using proxy as a gate to the apollo cache

            // Getting the data from the cache of the "FETCH_POSTS_QUERY"
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            // Updating the cache with the new post
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                    getPosts: [post, ...data.getPosts] // Updating the existing posts in the cache with the new post that was added
                }
            });

            values.body = '';
        },
        onError(err) {
            console.log(err.graphQLErrors[0].message);
            setError(err.graphQLErrors[0].message);
        },
        variables: values
    });

    function createPostCB() {
        createPost();
    }

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder='Enter post'
                        type='text'
                        name='body'
                        value={values.body}
                        onChange={handleChange}
                        error={error ? true : false}
                    />
                </Form.Field>
                <Button type='submit' color='teal'>
                    Submit
                </Button>
            </Form>
            {error && (
                <div className='ui error message' style={{ marginTop: 25 }}>
                    <ul className='list' style={{ marginTop: 5 }}>
                        <li>{error}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PostForm;
