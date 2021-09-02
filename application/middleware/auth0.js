import {auth} from 'express-openid-connect'; 

import config from "config";

const authConfigured = auth({
    issuerBaseURL: config.get('auth0.issuerBaseURL'),
    baseURL: config.get('auth0.baseURL'),
    clientID: config.get('auth0.clientID'),
    secret: config.get('auth0.secret'),
    idpLogout: true,
});

export default authConfigured;