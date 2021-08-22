import express from "express";
const router = express.Router();
import * as errorMod from '../modules/error.js';

import * as movie from "../model/movie.js";

import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

router.get('/', async(request,result)=>{
    try {
        const moviesFound = await movie.getAllMovies();
        result.send(moviesFound);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});

router.get('/page/:page', async (request,result)=>{
    try {
        const data = await movie.getAllMovies(request.params.page);
        result.send(data);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});

router.post('/',async(request,result)=>{
    try {
        const movieAdded = await movie.addMovie(
            request.body.name,
            request.body.genreId,
            request.body.inStock
        );
        result.send(movieAdded);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});


router.put('/',async(request,result)=>{
    try {
        const movieUpdated = await movie.updateMovie(
            request.body.movieId,
            request.body.name,
            request.body.genreId
        );
        result.send(movieUpdated);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});



router.delete('/',async(request,result)=>{
    try {
        const movieDeleted = await movie.deleteMovie(
            request.body.movieId
        );
        result.send(movieDeleted);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});




export default router;
