import React, { useState, useContext } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../graphql/mutations';

// Context
import { AuthContext } from '../../context/auth.context';
import { login } from '../../context/actions/auth.actions';

// Styles
import './login.styles.scss';

// Semantic Components
import { Form, Button } from 'semantic-ui-react';

// Custom Hooks
import { useForm } from '../../custom-hooks/hooks';

const Login = ({ history }) => {
    const { dispatch } = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { values, handleChange, onSubmit } = useForm(loginCB, {
        username: '',
        password: ''
    });

    const { username, password } = values;

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { login: userData } }) {
            dispatch(login(userData));
            history.push('/');
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.exception.errors);
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginCB() {
        loginUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    label='Username'
                    placeholder='Username'
                    type='text'
                    name='username'
                    value={username}
                    error={errors.username ? true : false}
                    onChange={handleChange}
                />
                <Form.Input
                    label='Password'
                    placeholder='Password'
                    type='password'
                    name='password'
                    value={password}
                    error={errors.password ? true : false}
                    onChange={handleChange}
                />
                <Button type='submit' primary>
                    Login
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className='ui error message'>
                    <ul className='list'>
                        {Object.values(errors).map(value => (
                            <li key={value}>{value}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Login;
