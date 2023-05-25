const request = require('supertest');
const app = require('../../app');
const Post = require('../../models/posts');
require('dotenv').config();

afterEach(() => {
    jest.clearAllMocks();
});
const post = {
    id: '64480d176305370cc0c5b1a7',
    user_id: '64480d822105370cc0c5b1a7',
    title: 'body',
    body: 'body',
};
const postValidate = {
    user_id: '65580d826305370cc0c5b1a7',
    title: 'body',
    body: 'body',
};

jest.mock('../../models/posts');

const PostMockImplementation = (id, saveMock, validateObj) =>
    Post.mockImplementation(() => ({
        id,
        user_id: post.user_id,
        title: post.title,
        body: post.body,
        save: saveMock,
        validateSync: jest.fn().mockReturnValueOnce(validateObj),
    }));

describe('GET /posts', () => {
    it('should return all post', async () => {
        Post.find.mockResolvedValue([post]);
        const res = await request(app).get('/posts');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body).toStrictEqual([post]);
    });
    it('should handle errors', async () => {
        Post.find.mockRejectedValue('fake error message');
        const res = await request(app).get('/posts');
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting post');
    });
});

describe('GET /posts/:id', () => {
    it('should return a single user', async () => {
        Post.findById.mockResolvedValue([post]);
        const res = await request(app).get(`/posts/${post.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual([post]);
    });

    it('should handle errors', async () => {
        Post.findById.mockRejectedValue('error message');
        const res = await request(app).get(`/posts/${post.id}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting post with id');
    });
});

describe('POST /posts', () => {
    it('should create a post', async () => {
        PostMockImplementation(post.id, jest.fn().mockResolvedValueOnce(post), null);
        const res = await request(app).post('/posts').send(post);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(post);
    });
    it('should handle validation errors', async () => {
        PostMockImplementation(
            post.id,
            jest.fn().mockResolvedValueOnce(postValidate),
            postValidate,
        );
        const res = await request(app).post('/posts').send(postValidate);
        expect(res.statusCode).toBe(404);
        expect(res.body).toStrictEqual(postValidate);
    });
    it('should handle errors', async () => {
        PostMockImplementation(post.id, jest.fn().mockRejectedValueOnce('error message'), null);
        const res = await request(app).post('/posts').send(post);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error creating post');
    });
});
