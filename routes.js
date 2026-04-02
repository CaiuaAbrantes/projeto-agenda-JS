const express = require('express');
const route = express.Router();
const homeControler = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')



//Rotas da home
route.get('/', homeControler.index);
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
//Rotas de Login

module.exports = route;
