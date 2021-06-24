const models = require('express').Router();

// Controllers Importing
const getUser = require('./apis/get-user');
const getAllUser = require('./apis/get-all-users');
const createUser = require('./apis/create-user');
const deleteUser = require('./apis/delete-user');
const createTask = require('./apis/create-task');
const createToken = require('./apis/get-token');

// Middlewares Importing
const authUser = require('./middlewares/jwt-authentications');

// Creating Routes
models.get('/get-user', authUser, getUser);
models.get('/get-all-users', authUser, getAllUser);
models.post('/create-user', authUser, createUser);
models.delete('/delete-user', authUser, deleteUser);
models.post('/create-task', authUser, createTask);
models.get('/create-token', createToken);

module.exports = models;