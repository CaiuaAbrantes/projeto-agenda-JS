require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.CONNECTIONSTRING)
    .then(()=> {
        app.emit('pronto');
    })
    .catch(err => console.error(err));


const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path')
const helmet = require('helmet');
const csrf = require('csurf');
const {middlewareGlobal, checkCsrfError, csfrMiddleware} = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.resolve(__dirname, 'public')));



const sessionOptions = session({
    secret: 'asdasdsajdasopdsd1231456',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized:false,
    cookie :{
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    }
});

app.use(sessionOptions);
app.use(flash());

app.use(csrf());

//Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csfrMiddleware);
app.use(routes);

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.on('pronto', ()=>{
    app.listen(3000, () =>{
    console.log('Acessar na http://localhost:3000');
    console.log('Servidor rodando na porta 3000');
});
})
