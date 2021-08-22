import mongoose from 'mongoose';

export const movieSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genres',
        required: true
    },
    inStock: {
        type: Number,
        default: 0,
        min: 0,
        max: 999
    }
});

export const movieMiniSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    }
});