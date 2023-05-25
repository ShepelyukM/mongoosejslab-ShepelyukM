const request = require('supertest');
const app = require('../../app');
const User = require('../../models/users');

require('dotenv').config();

afterEach(() => {
    jest.clearAllMocks();
});
const user = {
    id: '64480d826305370cc0c5b1a7',
    name: 'User',
    email: 'user@gmail.com',
    gender: 'male',
    status: 'inactive',
};
const user2 = {
    name: 'Userr',
    email: 'newuser@gmail.com',
    gender: 'male',
    status: 'active',
};
const userValidate = {
    name: 'Who',
    email: 'newUser@gmail.com',
    gender: 'male',
    status: 'active',
};
jest.mock('../../models/users');

const UserMockImplementation = (id, saveMock, validateObj) =>
    User.mockImplementation(() => ({
        id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        status: user.status,
        save: saveMock,
        validateSync: jest.fn().mockReturnValueOnce(validateObj),
    }));
describe('GET /users', () => {
    it('should return all users', async () => {
        User.find.mockResolvedValue([user]);
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body).toStrictEqual([user]);
    });
    it('should handle errors', async () => {
        User.find.mockRejectedValue('fake error message');
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting users');
    });
});
describe('GET /users/:id', () => {
    it('should return a single user', async () => {
        User.findById.mockResolvedValue([user]);
        const res = await request(app).get(`/users/${user.id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual([user]);
    });

    it('should handle errors', async () => {
        User.findById.mockRejectedValue('error message');
        const res = await request(app).get(`/users/${user.id}`);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting user with id');
    });
});

describe('POST /users', () => {
    it('should create a user', async () => {
        UserMockImplementation(user.id, jest.fn().mockResolvedValueOnce(user2), null);
        const res = await request(app).post('/users').send(user2);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(user2);
    });
    it('should handle validation errors', async () => {
        UserMockImplementation(
            user.id,
            jest.fn().mockResolvedValueOnce(userValidate),
            userValidate,
        );
        const res = await request(app).post('/users').send(userValidate);
        expect(res.statusCode).toBe(400);
        expect(res.body).toStrictEqual(userValidate);
    });
    it('should handle errors', async () => {
        UserMockImplementation(user.id, jest.fn().mockRejectedValueOnce('error message'), null);
        const res = await request(app).post('/users').send(user2);
        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error creating user');
    });
});

describe('PUT /users/:id', () => {
    it('should update and return user', async () => {
        const mockFindByIdAndUpdate = jest.spyOn(User, 'findByIdAndUpdate');
        mockFindByIdAndUpdate.mockResolvedValueOnce(user);
        UserMockImplementation(user.id, jest.fn().mockResolvedValueOnce(user2), null);
        const res = await request(app).put(`/users/${user.id}`).send(user2);
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(user);
        expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(user.id, user2, {
            new: true,
        });
    });
    it('should handle validation errors', async () => {
        const mockFindByIdAndUpdate = jest.spyOn(User, 'findByIdAndUpdate');
        mockFindByIdAndUpdate.mockResolvedValueOnce(user);
        UserMockImplementation(
            user.id,
            jest.fn().mockResolvedValueOnce(userValidate),
            userValidate,
        );
        const res = await request(app).put(`/users/${user.id}`).send(userValidate);
        expect(res.statusCode).toBe(400);
    });
});

describe('DELETE /users/:id', () => { 
    it('should delete a user', async () => { 
        const mockUser = { 
            deleteOne: jest.fn().mockResolvedValue(user), 
        }; 
        User.findById.mockResolvedValue(mockUser); 
        const res = await request(app).delete(`/users/${user.id}`); 
        expect(res.statusCode).toBe(202); 
        expect(res.text).toBe('User delete'); 
        expect(mockUser.deleteOne).toHaveBeenCalled(); 
    }); 
    it('should handle user not found', async () => { 
        User.findById.mockResolvedValue(null); 
        const res = await request(app).delete('/users/fiid'); 
        expect(res.statusCode).toBe(404); 
        expect(res.text).toBe('User not found'); 
    }); 
    it('should handle errors during deletion', async () => { 
        const mockUser = { 
            deleteOne: jest.fn().mockRejectedValue(new Error('Error deleting user')), 
        }; 
        User.findById.mockRejectedValue(mockUser); 
        const res = await request(app).delete(`/users/${user.id}`); 
        expect(res.statusCode).toBe(500); 
        expect(res.text).toBe('Error deleting user'); 
    }); 
});
