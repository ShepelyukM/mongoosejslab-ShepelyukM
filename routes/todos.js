const express = require('express');
const { getTodos, createTodos, getTodosById } = require('../controllers/todos.controller');

const router = express.Router();
router.get('/', getTodos);
router.post('/', createTodos);
router.get('/:id', getTodosById);

module.exports = router;
