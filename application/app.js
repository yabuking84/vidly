import express from 'express';

import config from 'config';
import debug from './modules/debug.js';

import routes from './startup/routes.js';
import database from './startup/database.js';
import middlewares from './startup/middlewares.js';
import tawing from './startup/tawing.js';
import checks from './startup/checks.js';
import loggers from './startup/loggers.js';






async function start(mode='development'){

    // START APP
    const app = express();

    // Debuggers
    debug.start("Starting...");
    debug.start("NODE_ENV = ",app.get('env'));

    // START LOGGERS
    loggers.init(app);

    // START MISC CHECKS
    checks.init();

    // START MONGODB CONNECTION - needs to be finished, issues with jest
    await database.init(mode);

    // START MIDDLEWARE
    middlewares.init(app);

    // START ROUTES
    routes.init(app);


    // Some random experiments and tests
    // tawing.init(app);    

    let PORT = config.get('port');
    
    // when running integration tests
    if(mode=='test') {
        PORT = 9999;
    }

    const server = await app.listen(PORT,(socket)=>{
        debug.start(`listening to PORT: ${PORT}...`);
    });

    return server;
}

export default {
    start
};

// testing ci pipeline - should push to staging or something - test 2
