import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Context
import { AuthContext } from '../context/auth.context';

const AuthRoute = ({ component: Component, ...otherProps }) => {
    const { user } = useContext(AuthContext);

    return <Route {...otherProps} render={props => (user ? <Redirect to='/' /> : <Component {...props} />)} />;
};

export default AuthRoute;
