const Post = require('../models/posts');

const getPost = async (req, res) => {
    try {
        const foundPost = await Post.find({});
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(500).send('Error getting post');
    }
};
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundPost = await Post.findById(id);
        res.status(200).json(foundPost);
    } catch (error) {
        res.status(500).send('Error getting post with id');
    }
};

const createPost = async (req, res) => {
    try {
        const { user_id, title, body } = req.body;
        const post = new Post({ user_id, title, body });
        const errors = post.validateSync();
        if (errors) {
            res.status(404).json(errors);
        } else {
            const savedPost = await post.save();
            res.status(200).json(savedPost);
        }
    } catch (error) {
        console.error(error)
        res.status(500).send('Error creating post');
    }
};
module.exports = {
    getPost,
    createPost,
    getPostById,
};
