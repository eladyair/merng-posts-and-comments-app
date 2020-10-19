import { LOGIN, LOGOUT } from '../types';

const authReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN:
            localStorage.setItem('jwt', payload.token);
            return {
                ...state,
                user: payload
            };
        case LOGOUT:
            localStorage.removeItem('jwt');
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
};

export default authReducer;
