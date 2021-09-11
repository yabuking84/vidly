import validator from '../modules/validator.js';
import err from '../modules/error.js';
import bcrypt from 'bcrypt';
import User from '../model/user.js';



function loginUser(email,password){return new Promise(async(resolve,reject)=>{
    try {
        validator.userLogin({email,password});

        // check if user exist
        let user = await User.findOne({email});
        if(!user) err.throwError('InvalidLogin','Invalid email or password!');

        // check if password
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword) err.throwError('InvalidLogin','Invalid email or password!');

        // generateAuthToken() -> check on user schema
        const token = user.generateAuthToken();

        resolve(token);

    } catch (error) {
        err.catchReject(error,reject);
    }
});}





export default {
    loginUser
};