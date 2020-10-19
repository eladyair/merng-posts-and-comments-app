const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const generateToken = user => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        }
    );
};

const checkAuth = context => {
    const authHeader = context.req.headers.authorization;

    // Will hold the word "Bearer ...." along with the token string
    if (authHeader) {
        const token = authHeader.split('Bearer ')[1];

        if (token) {
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);

                return user;
            } catch (err) {
                throw new AuthenticationError('Invalid/Expried token');
            }
        }

        throw new Error("Authentication token must be 'Bearer [token]");
    }

    throw new Error('Authorization header must be provided');
};

module.exports = {
    generateToken,
    checkAuth
};
