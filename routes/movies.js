import express from "express";
const router = express.Router();
import * as errorMod from '../modules/error.js';

import * as movie from "../model/movie.js";


router.get('/', async(req,res)=>{
    try {
        const moviesFound = await movie.getAllMovies();
        res.send(moviesFound);
    } catch (error) {
        errorMod.catchResultError(error,res);
    }
});






export default router;
