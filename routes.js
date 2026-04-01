const express = require('express');
const route = express.Router();
const homeControler = require('./src/controllers/home_controller');
const contactControler = require('./src/controllers/contact_controller');


//Rotas da home
route.get('/', homeControler.paginaInicial);
route.post('/', homeControler.trataPost);

route.get('/contato', contactControler.contato);

module.exports = route;
