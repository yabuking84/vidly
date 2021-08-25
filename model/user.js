import mongoose from 'mongoose';
import validator from '../modules/validator.js';
import debug from '../modules/debug.js';
import err from '../modules/error.js';

import {userSchema} from '../schema/user.js';

const User = mongoose.model('Users',userSchema);

function addUser(name,email,password,password_confirm){return new Promise(async(resolve,reject)=>{
    try {
        validator.user({
            name,email,password,password_confirm
        });

        // const userNew = await new User({
        //     name,
        //     email,
        //     password
        // }).save();
        // resolve(userNew);

        resolve('test');

    } catch (error) {
        err.catchRejectError(error,reject);
    }
});}

export default {
    addUser
};