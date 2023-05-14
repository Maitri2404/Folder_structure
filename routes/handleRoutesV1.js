const { handleGetUsers, handleAddUser, handleUpdateUser, handleUpdatePassword, handleLogin } = require('./users/v1/controllerV1');
const {authenticateToken} =require('./users/v1/middlewareV1')
const routerV1=require('express').Router();
const {login}=require('./users/login')

routerV1.get('/v1/getUsers',handleGetUsers);
routerV1.post('/v1/addUser',handleAddUser);
routerV1.post('/login',login)
routerV1.put('/v1/updateUsername/:username',authenticateToken,handleUpdateUser);
routerV1.put('/v1/updatePassword/:username',authenticateToken,handleUpdatePassword)
module.exports={routerV1}