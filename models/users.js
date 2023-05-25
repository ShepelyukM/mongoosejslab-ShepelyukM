const mongoose = require('mongoose');
const Todos = require('../models/todos');
const Post = require('../models/posts');

const userSchema = mongoose.Schema({
    id: mongoose.ObjectId,
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.+\..+/,
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ['male', 'female'],
            message: '{Value} is not supported',
        },
    },
    status: {
        type: String,
        required: true,
        values: ['active', 'inactive'],
        message: '{Value} is active or inactive',
    },
});
userSchema.pre('deleteOne', { document: true}, async function (next) {
    await Todos.deleteMany({ user_id: this._id });
    await Post.deleteMany({ user_id: this._id });
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;
