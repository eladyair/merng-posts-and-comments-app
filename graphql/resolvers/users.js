const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

// Models
const User = require('../../models/User');

// Utils
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators');
const { generateToken } = require('../../utils/utils');

module.exports = {
    Mutation: {
        async register(parent, { registrationInput: { username, email, password, confirmPassword } }, context, info) {
            // Validating user data
            const { errors, valid } = validateRegisterInput(username, email, password, confirmPassword);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // Making sure user doesn't already exist
            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('User already exists', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }

            // Hasing the password and creating an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const savedUser = await newUser.save();

            const token = generateToken(savedUser);

            return {
                ...savedUser._doc,
                id: savedUser.id,
                token
            };
        },

        async login(parent, { username, password }, context, info) {
            // Validating user data
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            // Making sure user exists
            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = 'Wrong credentials';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user.id,
                token
            };
        }
    }
};
