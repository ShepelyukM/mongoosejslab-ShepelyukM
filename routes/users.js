const express = require('express');
const {
    getUsers,
    createUser,
    getUserById,
    deleteUser,
    updateUser,
} = require('../controllers/users.controller');

const router = express.Router();

/* GET users listing. */
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

module.exports = router;
