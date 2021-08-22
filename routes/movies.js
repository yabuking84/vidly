import express from "express";
const router = express.Router();
import * as errorMod from '../modules/error.js';

import * as movie from "../model/movie.js";


router.get('/', async(request,result)=>{
    try {
        const moviesFound = await movie.getAllMovies();
        result.send(moviesFound);
    } catch (error) {
        errorMod.catchResultError(error,res);
    }
});


router.post('/',async(request,result)=>{
    try {
        
    } catch (error) {
        
    }
});




export default router;
