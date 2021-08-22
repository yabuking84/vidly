import * as validator from '../modules/validator.js';

import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

import * as errorMod from '../modules/error.js';
import mongoose from 'mongoose';

import {countGenre as countTheGenre} from './genre.js';
import { movieSchema } from '../schema/movie.js';

const Movie  = mongoose.model('Movies',movieSchema);

export function getAllMovies(page=0){return new Promise(async(resolve,reject)=>{
    try {
        const pageNum = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const moviesFound = await Movie
        .find()
        .populate('genre')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize);

        if(moviesFound.length)
        resolve(moviesFound);
        else
        errorMod.throwError('Empty','Movies empty!');
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}

export function addMovie(name,genreId,inStock){return new Promise(async(resolve,reject)=>{
    try {
        const validateError = validator.movie({
            name,
            genreId,
            inStock
        });
        if(validateError) errorMod.throwError('InvalidInput',validateError.details[0].message);

        const genre = await countTheGenre(genreId);
        if(genre<1) errorMod.throwError('NotFound','Genre not found!');


        const movieNew = new Movie({
            name,
            genre:genreId,
            inStock            
        });
        const retVal = movieNew.save();

        resolve(retVal);

    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}



export function updateMovie(movieId,newName,newGenreId){return new Promise(async (resolve,reject)=>{
    try {
        const validateError = validator.movieUpdate({
            id: movieId,
            name: newName,
            genreId: newGenreId,
        });
        if(validateError) errorMod.throwError('InvalidInput',validateError.details[0].message);

        let genreData = {};
        if(newGenreId) {
            const genre = await countTheGenre(newGenreId);
            if(genre<1) errorMod.throwError('NotFound','Genre not found!');
            
            genreData = {
                genre: newGenreId 
            };
        }

        const movieUpdated = await Movie.findOneAndUpdate({
            _id: movieId,
        },{
            $set: {
                name: newName,
                ...genreData    
            }
        },{
            new: true
        });

        resolve(movieUpdated);
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}


export function deleteMovie(movieId){return new Promise(async (resolve,reject)=>{
    try {
        const validateError = validator.movieDelete({id: movieId});
        if(validateError) errorMod.throwError('InvalidInput',validateError.details[0].message);

        const movieDeleted = await Movie.findOneAndDelete({
            _id: movieId
        });
        if(movieDeleted)
        resolve(movieDeleted);
        else
        errorMod.throwError('NotFound','Delete failed! Movie not found!');
        
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}