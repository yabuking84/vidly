import express from "express";
const router = express.Router();
import err from '../modules/error.js';

import auth0 from '../middleware/auth0.js';

router.get('/',async(request,result)=>{
    try {
        result.send('auth0');
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.get('/secure1',auth0.middleware,async(request,result)=>{
    try {
        const token = request.header('bearer');

        result.send(token);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.get('/yoyo',async(request,result)=>{
    try {
        if(typeof request.oidc !== 'undefined' && request.oidc.isAuthenticated())
        result.send('yoyo Logged in!');
        else 
        result.send('yoyo Not logged in!');
    } catch (error) {
        err.catchResultError(error,result);
    }
});

export default router;