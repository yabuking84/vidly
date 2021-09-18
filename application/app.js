import express from 'express';

import config from 'config';
import debug from './modules/debug.js';

import routes from './startup/routes.js';
import database from './startup/database.js';
import middlewaresStart from './startup/middleware-start.js';
import middlewaresEnd from './startup/middleware-end.js';
import tawing from './startup/tawing.js';
import checks from './startup/checks.js';
import loggers from './startup/loggers.js';






 function start(mode='development'){

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
    database.init(mode);

    // START MIDDLEWARE
    middlewaresStart.init(app);
    
    // START ROUTES
    routes.init(app);
    

    // START MIDDLEWARE END
    middlewaresEnd.init(app);

    // Some random experiments and tests
    // tawing.init(app);    

    let PORT = config.get('port');
    
    // when running integration tests
    if(mode=='test') {
        PORT = 9999;
    }

    const server = app.listen(PORT,(socket)=>{
        debug.start(`listening to PORT: ${PORT}...`);
    });
    server.keepAliveTimeout = 99999;
    server.headersTimeout = 99999;

    return server;
}

export default {
    start
};

// testing ci pipeline - should push to staging or something - test 2
