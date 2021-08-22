import * as validator from '../modules/validator.js';

import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

import * as errorMod from '../modules/error.js';
import mongoose from 'mongoose';


const movieSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
        trim: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    inStock: {
        type: Number,
        min: 0,
        max: 999
    }
});
const Movie  = mongoose.model('Movies',movieSchema);



export function getAllMovies(page=0){return new Promise(async(resolve,reject)=>{
    try {
        const pageNumber = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const moviesFound = await Movie
        .find()
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize);

        if(moviesFound.length)
        resolve(moviesFound);
        else
        errorMod.throwError('Empty','Movies empty!');
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}