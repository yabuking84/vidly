// Debugger
import debug from '../modules/debug.js';

import err from '../modules/error.js';

import config from 'config';

import jwt from 'jsonwebtoken';

function employee(request,result,next){
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



export default {
    employee
};