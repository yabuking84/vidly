import express from "express";
const router = express.Router();

import debug from '../modules/debug.js';

import  err from '../modules/error.js';

import customer from "../model/customer.js";

router.get('/', async(request,result)=>{
    try {
        const customers = await customer.getAllCustomers();
        result.send(customers);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.get('/page/:pageNum', async(request,result)=>{
    try {
        const customers = await customer.getAllCustomers(request.params.pageNum);
        result.send(customers);
    } catch (error) {
        err.catchResultError(error,result);
    }
});

router.post('/find',async(request,result)=>{
    try {
        const customerFound = await customer.getCustomerByName(request.body.name);
        // if rank is gold
        if(customerFound.rank == 'gold') {
            const emailSent = await customer.sendCustomerEmail(customerFound);
            result.send({
                ...customerFound.toObject(),
                emailSent: (emailSent)?true:false
            });
        } else {
            result.send(customerFound);            
        }
        
    } catch (error) {
        err.catchResultError(error,result);
    }
});


router.post('/',async(request,result)=>{
    try {
        const customerAdded = await customer.addCustomer(request.body.name,request.body.age,request.body.rank);
        result.send(customerAdded);  
    } catch(error) {
        err.catchResultError(error,result);
    }
});

router.put('/',async(request,result)=>{
    try {
        const customerUpdated = await customer.updateCustomer(request.body.id,request.body.name,request.body.rank);
        result.send(customerUpdated);  
    } catch (error) {
        err.catchResultError(error,result);
    }
});


router.delete('/delete',async(request,result)=>{
    try {
        const customerDeleted = await customer.deleteCustomer(request.body.id);
        result.send(customerDeleted);
    } catch (error) {
        err.catchResultError(error,result);
    }
});


export default router;