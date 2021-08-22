import express from 'express';
const router = express.Router();

import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

import * as errorMod from '../modules/error.js';

import * as rentals from '../model/rental.js';

router.get('/',async(request,result)=>{
    try {
        const rentalsFound = await  rentals.getAllRentals();
        result.send(data);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});

router.get('/page/:page', async (request,result)=>{
    try {
        const data = await rentals.getAllRentals(request.params.page);
        result.send(data);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});



export default router;