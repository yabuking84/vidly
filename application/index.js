// const fs = require('fs');
// const path = require('path');
// const express = require('express');
// const config = require('config');
// const helmet = require("helmet");
// const morgan = require('morgan');
// const logger = require('./middleware/logger');
// Debugger
// const startUpDebug = require('debug')('app:startup');
// const dbDebug = require('debug')('app:db');
// const defaultDebug = require('debug')('app:default');
// const genres = require('./routes/genres');


import fs from 'fs';
import path from 'path';
import express from 'express';
import config from 'config';
import helmet from 'helmet';
import morgan from 'morgan';

import err from './modules/error.js';

import testMiddleware, {var1} from './middleware/test.js';

// Debugger
import debug from './modules/debug.js';


import genres from './routes/genres.js';
import customers from './routes/customers.js';
import movies from './routes/movies.js';
import rentals from './routes/rentals.js';
import users from './routes/users.js';
import auth from './routes/auth.js';



const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const NODE_ENV = app.get('env');
const PORT = config.has('port')? config.get('port') : 3000;


// getting env secret password variables
// debug.start(config.get('mail.password'));

let asd = 'asdasdd';
// Debuggers
debug.start("Starting...");
debug.def("NODE_ENV = ",NODE_ENV);
debug.def(config.get('name'));
debug.def(config.get('mail.password'));
debug.def(config.get('jwt_key'));
debug.error("test error");


// check for needed variables
try {
    if(!config.has('jwt_key') || !config.get('jwt_key'))
    err.throwError('StartupError','JWT Private Key not defined!');        
} catch (error) {
    debug.error(error.message);
    process.exit(1);
}


// Helps secure your apps by setting various HTTP headers.
app.use(helmet());

// HTTP request logger. create a write stream (in append mode) to write to log file
const __dirname = path.resolve();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
app.use(morgan('tiny', { stream: accessLogStream }));

// tawing's custom test middleware
app.use(testMiddleware);
debug.def(var1);

// DB connection
import mongoose from 'mongoose';

// must configure mongodb to have replica set to make transactions work asd
mongoose.connect('mongodb://mongodb/vidly',{
    'useNewUrlParser': true,
    'useFindAndModify': false,
    'useCreateIndex': true,
    'useUnifiedTopology': true
})
.then(()=>{
    debug.def('Connected to MongoDB..');
})
.catch((error)=>{
    debug.db('DB Connection Error: ', error);
});

app.get('/test',function (req, res) {
    res.send('hi world!!!!');

        
});


// Auth0 middleware

debug.def(config.get('auth0.issuerBaseURL'));
debug.def(config.get('auth0.baseURL'));
debug.def(config.get('auth0.clientID'));
debug.def(config.get('auth0.secret'));


// Auth0 test
import auth0TestRoute from './routes/auth0-test.js';
app.use('/auth0-test',auth0TestRoute);
// Auth0 test

// Routes
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);
// Routes


app.listen(PORT,(socket)=>{
    debug.start(`listening to PORT: ${PORT}...`);
});