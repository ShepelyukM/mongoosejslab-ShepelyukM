const request = require('supertest');
const app = require('../../app');
const Todos = require('../../models/todos');
require('dotenv').config();

afterEach(() => {
    jest.clearAllMocks();
});
const todos = {
    id: '64480d826305370cc0c5b1a7',
    user_id: '64480d826305370cc0c5b1a7',
    title: 'createtodos',
    due_on: '2021-11-11T00:00:00.000+05:30',
    status: 'completed',
};
const todosValidate = {
    user_id: '64480d826405370cc0c5b1a7',
    title: 'createtodos',
    due_on: '2021-11-11T00:00:00.000+05:30',
    status: 'pending',
};

jest.mock('../../models/todos');

const TodosMockImplementation = (id, saveMock, validateObj) =>
    Todos.mockImplementation(() => ({
        id,
        user_id: todos.user_id,
        title: todos.title,
        due_on: todos.due_on,
        save: saveMock,
        status: todos.status,
        validateSync: jest.fn().mockReturnValueOnce(validateObj),
    }));

describe('GET /todos', () => {
    it('should return all todos', async () => {
        Todos.find.mockResolvedValue([todos]);
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body).toStrictEqual([todos]);
    });
    it('should handle errors', async () => {
        Todos.find.mockRejectedValue('fake error message');
        const res = await request(app).get('/todos');
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting todos');
    });
});

describe('GET /todos/:id', () => {
    it('should return a single user', async () => {
        Todos.findById.mockResolvedValue([todos]);
        const res = await request(app).get(`/todos/${todos.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual([todos]);
    });

    it('should handle errors', async () => {
        Todos.findById.mockRejectedValue('error message');
        const res = await request(app).get(`/todos/${todos.id}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting todos with id');
    });
});

describe('POST /todos', () => {
    it('should create a todos', async () => {
        TodosMockImplementation(todos.id, jest.fn().mockResolvedValueOnce(todos), null);
        const res = await request(app).post('/todos').send(todos);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(todos);
    });
    it('should handle validation errors', async () => {
        TodosMockImplementation(
            todos.id,
            jest.fn().mockResolvedValueOnce(todosValidate),
            todosValidate,
        );
        const res = await request(app).post('/todos').send(todosValidate);
        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual(todosValidate);
    });
    it('should handle errors', async () => {
        TodosMockImplementation(todos.id, jest.fn().mockRejectedValueOnce('error message'), null);
        const res = await request(app).post('/todos').send(todos);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error creating todos');
    });
});
