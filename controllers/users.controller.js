const User = require('../models/users');

const getUsers = async (req, res) => {
    try {
        const foundUsers = await User.find({});
        res.status(200).json(foundUsers);
    } catch (error) {
        res.status(500).send('Error getting users');
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUsers = await User.findById(id);
        res.status(200).json(foundUsers);
    } catch (error) {
        res.status(500).send('Error getting user with id');
    }
};
const createUser = async (req, res) => {
    try {
        const { name, email, gender, status } = req.body;
        const user = new User({ name, email, gender, status });
        const errors = user.validateSync();
        if (errors) {
            res.status(400).json(errors);
        } else {
            const savedUser = await user.save();
            res.status(200).json(savedUser);
        }
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, gender, status } = req.body;
    const obj = new User({ name, email, gender, status });
    const errors = obj.validateSync();
    if (errors) {
        res.status(400).json(errors);
    } else {
        const user = await User.findByIdAndUpdate(
            id,
            { name, email, gender, status },
            { new: true },
        );
        res.status(200).json(user);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = await User.findById(id);
        if (!foundUser) {
            res.status(404).send('User not found');
        } else {
            await foundUser.deleteOne();
            res.status(202).send('User delete');
        }
    } catch (error) {
        res.status(500).send('Error deleting user');
    }
};

module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
};
