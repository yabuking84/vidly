import mongoose from 'mongoose';
import validator from '../modules/validator.js';
import debug from '../modules/debug.js';
import err from '../modules/error.js';


function addUser(name,email,password,password_confirm){return new Promise(async(resolve,reject)=>{
    try {
        validator.user({
            name,email,password,password_confirm
        });

        

    } catch (error) {
        err.catchRejectError(error,reject);
    }
});};

export default {
    addUser
};