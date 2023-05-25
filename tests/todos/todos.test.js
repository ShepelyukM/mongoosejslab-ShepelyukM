const mongoose = require('mongoose');
const db = require('../db');
const Todos = require('../../models/todos');

beforeAll(async () => db.connect());
beforeEach(async () => db.clear());
afterAll(async () => db.close());

describe('Todos model test', () => {
    it('should add todos ', async () => {
        const todos = new Todos({
            user_id: '64480d826305370cc0c5b1a7',
            title: 'createtodos',
            due_on: '2021-11-11T00:00:00.000+05:30',
            status: 'completed',
        });
        const createTodos = await todos.save();
        expect(createTodos.title).toBe('createtodos');
    });
    it('should fail for create todos without required fields', async () => {
        const todos = {
            user_id: '64480d1826305370cc0c5b2a7',
            title: 'createtodos',
            due_on: '2021-11-11T00:00:00.000+05:30',
            status: 'pending',
        };
        try {
            const newTodos = new Todos(todos);
            await newTodos.save();
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
        }
    });
});
