import express from "express";
const router = express.Router();
import  err from '../modules/error.js';

import movie from "../model/movie.js";

import debug from '../modules/debug.js';

router.get('/', async(request,result)=>{
    try {
        const moviesFound = await movie.getAllMovies();
        result.send(moviesFound);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.get('/page/:page', async (request,result)=>{
    try {
        const data = await movie.getAllMovies(request.params.page);
        result.send(data);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.post('/',async(request,result)=>{
    try {
        const movieAdded = await movie.addMovie(
            request.body.name,
            request.body.genreId,
            request.body.inStock,
            request.body.dailyRentalRate
        );
        result.send(movieAdded);
    } catch (error) {
        err.catchResultError(error,result);
    }
});


router.put('/',async(request,result)=>{
    try {
        const movieUpdated = await movie.updateMovie(
            request.body.movieId,
            request.body.name,
            request.body.genreId,
            request.body.dailyRentalRate
        );
        result.send(movieUpdated);
    } catch (error) {
        err.catchResultError(error,result);
    }
});



router.delete('/',async(request,result)=>{
    try {
        const movieDeleted = await movie.deleteMovie(
            request.body.movieId
        );
        result.send(movieDeleted);
    } catch (error) {
        err.catchResultError(error,result);
    }
});




export default router;
