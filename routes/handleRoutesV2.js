const { handleGetUsers, handleAddUser, handleUpdateUser, handleUpdatePassword, handleLogin } = require('./users/v2/controllerV2');
const routerV2=require('express').Router();

routerV2.get('/v2/getUsers', handleGetUsers);
routerV2.post('/v2/addUser',handleAddUser);
// routerV2.post('/v2/login',handleLogin)
routerV2.put('/v2/updateUsername/:username',handleUpdateUser);
routerV2.put('/v2/updatePassword/:username',handleUpdatePassword);

module.exports={routerV2};
