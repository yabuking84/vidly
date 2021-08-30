import express from "express";
const router = express.Router();

// import debug from '../modules/debug.js';
import err from '../modules/error.js';
import user from '../model/user.js';

// remove this
import mongoose from 'mongoose';
import {userSchema} from '../schema/user.js';
const User = mongoose.model('Users',userSchema);



// add user
router.post('/',async(request,result)=>{
    try {
        const userAdded = await user.addUser(
            request.body.name,
            request.body.email,
            request.body.password,
            request.body.password_confirm
        );
        result.send(userAdded);
    } catch (error) {
        err.catchResultError(error,result);
    }
});


// remove this
router.get('/test',async(request,result)=>{
    try {
        User.find().then((val)=>{
            console.log('val',val);
            result(val);
        });
    } catch (error) {
        err.catchResultError(error,result);
    }
});





export default router;