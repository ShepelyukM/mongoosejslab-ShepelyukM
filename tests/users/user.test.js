const mongoose = require('mongoose');
const db = require('../db');
const app = require('../../app');
const User = require('../../models/users');
const Todos = require('../../models/todos');
const Post = require('../../models/posts');
const request = require('supertest');

beforeAll(async () => db.connect());
beforeEach(async () => db.clear());
afterAll(async () => db.close());

describe('User model test', () => {
    it('should add user ', async () => {
        const user = new User({
            name: 'User',
            email: 'gjgjhlgjdg@gmail.com',
            gender: 'male',
            status: 'inactive',
        });
        const createUser = await user.save();
        expect(createUser.name).toBe('User');
    });
    it('should fail for create user without required fields', async () => {
        const user = {
            name: 'User',
            email: 'odfdsfsdfsdf@gmail.com',
            gender: 'male',
            status: 'inactive',
        };
        try {
            const newUser = new User(user);
            await newUser.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });
    it('should delete todos and posts', async () => { 
        const user = new User({ 
            id: '64480d826305370cc0c5b1a7',
            name: "Userrr", 
            email: 'user@gmail.com', 
            gender: 'male', 
            status: 'inactive', 
        }); 
        await user.save(); 
        const post = new Post({ 
            user_id: user._id, 
            title: 'createpost', 
            body: 'body', 
        }); 
        await post.save(); 
        const todos = new Todos({ 
            post: post.id,
            user_id: user._id,  
            title: "create",
            due_on:"2021-06-27T00:00:00.000+06:30",
            status:"pending"
        }); 
        todos.save(); 
        const res = await request(app).delete(`/users/${user._id}`); 
        const deletedUser = await User.findById(user.id); 
        const deletedPost = await Post.find({ user_id: user._id }); 
        const deletedTodos = await Todos.find({ user_id:  user._id  }); 
        expect(res.statusCode).toBe(202); 
        expect(deletedUser).toBeNull(); 
        expect(deletedPost).toStrictEqual([]); 
        expect(deletedTodos).toStrictEqual([]); 
    });
});
