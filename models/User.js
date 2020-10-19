const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('user', UserSchema);
