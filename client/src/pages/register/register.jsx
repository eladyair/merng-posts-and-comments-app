import React, { useState, useContext } from 'react';

// Apollo
import { useMutation } from '@apollo/react-hooks';
import { REGISTER_USER } from '../../graphql/mutations';

// Context
import { AuthContext } from '../../context/auth.context';
import { login } from '../../context/actions/auth.actions';

// Styles
import './register.styles.scss';

// Semantic Components
import { Form, Button } from 'semantic-ui-react';

// Custom Hooks
import { useForm } from '../../custom-hooks/hooks';

const Register = ({ history }) => {
    const { dispatch } = useContext(AuthContext);

    const [errors, setErrors] = useState({});

    const { values, handleChange, onSubmit } = useForm(registerUser, {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { username, email, password, confirmPassword } = values;

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { register: userData } }) {
            dispatch(login(userData));
            history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function registerUser() {
        addUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Register</h1>
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
                    label='Email'
                    placeholder='Email'
                    type='text'
                    name='email'
                    value={email}
                    error={errors.email ? true : false}
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
                <Form.Input
                    label='Confirm Password'
                    placeholder='Confirm Password'
                    type='password'
                    name='confirmPassword'
                    value={confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={handleChange}
                />
                <Button type='submit' primary>
                    Register
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

export default Register;
