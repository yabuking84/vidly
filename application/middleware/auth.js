// Debugger
import debug from '../modules/debug.js';

import err from '../modules/error.js';

import config from 'config';

import jwt from 'jsonwebtoken';

function loggedIn(request,result,next){
    try {
        const token = request.header('x-auth-token');
        if(!token) err.throwError('InvalidToken','Access Denied Invalid Token!'); 
        
        const decoded = jwt.verify(token,config.get('jwt_key'));

        // so you can get the decoded data by request.user
        request.user = decoded;

        next();
            
    } catch (error) {
        err.catchResultError(error,result);
    }
}


function admin(request,result,next){
    try {

        // check if admin
        if(request.user.role!=='admin') 
        err.throwError('InvalidRole','Role invalid!');

        next();
            
    } catch (error) {
        err.catchResultError(error,result);
    }
}



export default {
    loggedIn,
    admin
};