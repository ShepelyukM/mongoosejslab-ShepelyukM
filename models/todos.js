const mongoose = require('mongoose');


const todosSchema = mongoose.Schema({
    id: mongoose.ObjectId,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    due_on: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        values: ['completed', 'pending'],
        message: '{Value} is active or inactive',
    },
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
