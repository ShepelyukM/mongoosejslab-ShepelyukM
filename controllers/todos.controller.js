const Todos = require('../models/todos');

const getTodos = async (req, res) => {
    try {
        const foundTodos = await Todos.find({});
        res.status(200).json(foundTodos);
    } catch (error) {
        res.status(500).send('Error getting todos');
    }
};
const getTodosById = async (req, res) => {
    try {
        const { _id } = req.params;
        const foundTodos = await Todos.findById({ _id });
        res.status(200).json(foundTodos);
    } catch (error) {
        res.status(500).send('Error getting todos with id');
    }
};

const createTodos = async (req, res) => {
    try {
        const { user_id, title, due_on, status } = req.body;
        const todos = new Todos({ user_id, title, due_on, status });
        const errors = todos.validateSync();
        if (errors) {
            res.status(400).json(errors);
        } else {
            const savedTodos = await todos.save();
            res.status(200).json(savedTodos);
        }
    } catch (error) {
        res.status(500).send('Error creating todos');
    }
};
module.exports = {
    getTodos,
    createTodos,
    getTodosById,
};
