import express from "express";
const router = express.Router();

import debug from 'debug';
const defaultDebug = debug('app:default');

import * as errorMod from '../modules/error.js';

import * as customer from "../model/customer.js";

router.get('/', async(req,res)=>{
    try {
        const customers = await customer.getAllCustomers();
        res.send(customers);
    } catch (error) {
        errorMod.catchResultError(error,res);
    }
});

router.get('/page/:pageNumber', async(req,res)=>{
    try {
        const customers = await customer.getAllCustomers(req.params.pageNumber);
        res.send(customers);
    } catch (error) {
        errorMod.catchResultError(error,res);
    }
});

router.post('/find',async(req,res)=>{
    try {
        let customerFound = await customer.getCustomerByName(req.body.name);
        
        // if rank is gold
        if(customerFound.rank == 'gold') {
            try {
                const emailSent = await customer.sendCustomerEmail(customerFound);
                res.send({
                    ...customerFound,
                    emailSent: true
                });
                return;
            } catch (error) {
                res.send({
                    ...customerFound,
                    emailSent: false
                });
                return;
            }
        }
        
        res.send(customerFound);
    } catch (error) {
        errorMod.catchResultError(error,res);
    }
});


router.post('/',async(req,res)=>{
    try {
        const customerAdded = await customer.addCustomer(req.body.name,req.body.rank);
        res.send(customerAdded);  
    } catch(error) {
        errorMod.catchResultError(error,res);
    }
});


export default router;