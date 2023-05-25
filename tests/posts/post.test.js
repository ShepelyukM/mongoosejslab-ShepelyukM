const mongoose = require('mongoose');
const db = require('../db');
const Post = require('../../models/posts');

beforeAll(async () => db.connect());
beforeEach(async () => db.clear());
afterAll(async () => db.close());

describe('Post model test', () => {
    it('should add post ', async () => {
        const post = new Post({
            user_id: '64480d826305370cc0c5b1a7',
            title: 'createpost',
            body: 'createbody',
        });
        const createPost = await post.save();
        expect(createPost.title).toBe('createpost');
    });
    it('should fail for create post without required fields', async () => {
        const post = {
            user_id: '64480d826305370cc0c5b1t7',
            title: 'createpost',
            body: 'createbody',
        };
        try {
            const newPost = new Post(post);
            await newPost.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });
});
