import jwtDecode from 'jwt-decode';

export const getTokenIfValid = () => {
    const decodedToken = localStorage.getItem('jwt') ? jwtDecode(localStorage.getItem('jwt')) : null;

    if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwt');
        return null;
    } else {
        return decodedToken;
    }
};
