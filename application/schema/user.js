import mongoose from 'mongoose';

import user from '../model/user.js';

import err from '../modules/error.js';
import jwt from 'jsonwebtoken';
import config from 'config';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },   
    contactNo: {
        type: String,
        minlength: 5,
        maxlength: 50,
        trim: true
    },
    role: {
        type: String,
        enum: ['user','employee','admin'],
        default: 'user'
    },    
    email: {
        type: String,
        required: true,
        validate: {
            validator: async (val)=>{
                try {
                    const emailExist = await user.emailExist(val);
                    if(emailExist)
                    return false;
                    else
                    return true;
                } catch (error) {
                    err.throwError('CheckEmailExist',error.message);
                }
            },
            message: 'User already exist!'
        },
        minlength: 3,
        maxlength: 255,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

// Add a method to the User Model
userSchema.methods.generateAuthToken = function(){
    // 60 * 30 means expire in 3 min, if "120d" means 120 days, if "120" means 120 milliseconds
    return jwt.sign(
        {
            _id:this._id,
            role:this.role
        }, 
        config.get('jwt_key'), 
        {expiresIn:60*3}
    );
};


export {userSchema};