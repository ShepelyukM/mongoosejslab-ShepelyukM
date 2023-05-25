const express = require('express');
const { getPost, createPost, getPostById } = require('../controllers/post.controllers');

const router = express.Router();
router.get('/', getPost);
router.post('/', createPost);
router.get('/:id', getPostById);

module.exports = router;
