import {jest} from '@jest/globals';

import debug from '../../modules/debug.js';

import User from '../../model/user.js';
import mongoose from 'mongoose';

import Auth from '../../middleware/auth.js';


// UserLogin functions ...
describe('UserLogin', ()=>{

    // this will test lib.notifyCustomer() if mail.send() was called
    it('should show user details',()=>{
        
        const user = { 
            _id: mongoose.Types.ObjectId().toHexString(),
            role:'admin'
        };
        const token  = new User(user).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(`Bearer ${token}`)
        };

        const res = {};
        const next = jest.fn();        
        Auth.loggedIn(req, res, next);
        expect(req.user).toMatchObject(user);
    });
});