import mongoose from 'mongoose';
import validator from '../modules/validator.js';
import debug from '../modules/debug.js';
import err from '../modules/error.js';

import {userSchema} from '../schema/user.js';
import _ from "lodash";

import hash from '../modules/hash.js';

const User = mongoose.model('Users',userSchema);



function addUser(name,email,password,password_confirm){return new Promise(async(resolve,reject)=>{
    try {
        validator.user({
            name,email,password,password_confirm
        });

        const hashedPassword = await hash.run(password);

        const userNew = await new User({
            name,
            email,
            password:hashedPassword
        }).save();

        resolve(_.pick(userNew,['_id','name','email']));

    } catch (error) {
        err.catchRejectError(error,reject);
    }
});}

function emailExist(email){return new Promise(async(resolve,reject)=>{
    try {
        const user = await User.findOne({'email':email});
        if(user)
        resolve(true);
        else 
        resolve(false);
    } catch (error) {
        err.catchRejectError(error,reject);
    }
});}

export default {
    addUser,
    emailExist
};