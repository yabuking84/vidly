import config from 'config';

import debug from '../modules/debug.js';
import testMiddleware, {var1} from '../middleware/test.js';
import auth0 from '../authentication/auth0.js';
import auth0TestRoute from '../routes/auth0-test.js';
   

// testing if imported modules are being executed, and they are being executed.
// import testRequire from '../tests/test-require.js';

function init(app) {

    // tawing's custom test middleware
    app.use(testMiddleware);
    
    // tawing's test import and export
    debug.def(var1);

    const NODE_ENV = app.get('env');

    // Debuggers
    debug.start("Starting...");
    debug.def("NODE_ENV = ",NODE_ENV);
    debug.def(config.get('name'));
    debug.def(config.get('mail.password'));
    debug.def(config.get('jwt_key'));
    debug.error("test error");

    // Auth0 test
    //////////////////////////////////////////////////////////
    // add Auth0 middleware to /auth0-test
    app.use('/auth0-test',auth0.router);

    // add routes to /auth0-test
    app.use('/auth0-test',auth0TestRoute);
    //////////////////////////////////////////////////////////
    // Auth0 test

    debug.def(config.get('auth0.issuerBaseURL'));
    debug.def(config.get('auth0.baseURL'));
    debug.def(config.get('auth0.clientID'));
    debug.def(config.get('auth0.secret'));
    
    
}



export default {
    init
};