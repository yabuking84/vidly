import express from 'express';
const router = express.Router();

// import debug from '../modules/debug.js';
import err from '../modules/error.js';

import auth from '../model/auth.js';

import debug from '../modules/debug.js';

router.post('/',async (request,result)=>{
    try {
        const token = await auth.loginUser(
            request.body.email,
            request.body.password
        );
        result.header('x-auth-token',token).send(true);
    } catch (error) {
        err.catchResultError(error,result);
    }
});


export default router;