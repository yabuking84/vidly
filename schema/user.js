import mongoose from 'mongoose';


export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },   
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v)=>{

            },
            message: 'Invalid Email!'
        },
        minlength: 3,
        maxlength: 50,
        trim: true
    },           
});