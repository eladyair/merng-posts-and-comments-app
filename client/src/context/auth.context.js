import React, { createContext, useReducer } from 'react';

// Utils
import { getTokenIfValid } from '../utils/utils';

import authReducer from './reducers/auth.reducer';

const initialState = {
    user: getTokenIfValid()
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return <AuthContext.Provider value={{ user: state.user, dispatch }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
