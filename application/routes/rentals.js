import express from 'express';
const router = express.Router();

import debug from '../modules/debug.js';
import  err from '../modules/error.js';

import rental from '../model/rental.js';

router.get('/',async(request,result)=>{
    try {
        const rentalsFound = await  rental.getAllRentals();
        result.send(rentalsFound);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.get('/page/:page', async (request,result)=>{
    try {
        const data = await rental.getAllRentals(request.params.page);
        result.send(data);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.post('/', async(request,result)=>{
    try {
        const data = await rental.addRental(request.body.customerId,request.body.movieId);
        result.send(data);
    } catch (error) {
        err.catchResultError(error,result);
    }
});


export default router;