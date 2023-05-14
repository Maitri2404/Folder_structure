// const { authenticateToken } = require('./users/login');
const { handleGetUsers, handleAddUser, handleUpdateUser, handleUpdatePassword,handleLogin} = require('./users/v1/controllerV1');
const {authenticateToken, isAuthorized} =require('./users/v1/middlewareV1')
const routerV1=require('express').Router();
// const {login}=require('./users/login')

routerV1.get('/v1/getUsers',handleGetUsers);
routerV1.post('/v1/addUser',handleAddUser);
routerV1.post('/login',handleLogin)
routerV1.put('/v1/updateUsername/:username',authenticateToken,isAuthorized,handleUpdateUser);
routerV1.put('/v1/updatePassword/:username',authenticateToken,isAuthorized,handleUpdatePassword)
module.exports={routerV1}