import * as validator from '../modules/validator.js';
import * as errorMod from '../modules/error.js';
import * as helper from '../modules/helper.js';

import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');


import mongoose from 'mongoose';


import { rentalSchema } from '../schema/rental.js';

const Rental = mongoose.model('Rentals',rentalSchema);


export function getAllRentals(page=0){return new Promise(async(resolve,reject)=>{
    try {
        const pageNum = (page>0)?page:1;    
        const pageSize = (page>0)?3:0;

        const rentalsFound = await Rental
        .find()
        .select('-__v')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize);

        if(rentalsFound.length)
        resolve(rentalsFound);
        else
        errorMod.throwError('Empty','Rentals empty!');        
    } catch (error) {
        errorMod.catchRejectError(error, reject);
    }
});}


export function addRental(){return new Promise(async(resolve,reject)=>{
    try {
        
    } catch (error) {
        
    }
});}