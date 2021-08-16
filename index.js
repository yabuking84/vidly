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


import logger from './middleware/logger.js';

// Debugger
import debug from 'debug';
const startUpDebug = debug('app:startup');
const dbDebug = debug('app:db');
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

import genres from './routes/genres.js';
import customers from './routes/customers.js';

const app = express();



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


const NODE_ENV = app.get('env');
const PORT = config.has('port')? config.get('port') : 3000;


// getting env secret password variables
// console.log(config.get('mail.password'));

let asd = 'asdasdd';
// Debuggers
startUpDebug("Starting...");
defaultDebug(config.get('mail.password'));
errorDebug("test error");



// Helps secure your apps by setting various HTTP headers.
app.use(helmet());

// HTTP request logger. create a write stream (in append mode) to write to log file
const __dirname = path.resolve();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })
app.use(morgan('tiny', { stream: accessLogStream }));

// tawing's custom logger middleware
// app.use(logger);



// Routes
app.use('/api/genres',genres);
app.use('/api/customers',customers);

// ssdasd


app.listen(PORT,(socket)=>{
    console.log(`listening to PORT: ${PORT}...`);
});