import * as validator from '../modules/validator.js';

import mongoose from 'mongoose';

import debug from 'debug';
const defaultDebug = debug('app:default');
const dbDebug = debug('app:db');
const errorDebug = debug('app:error');

import DateSchema from './schema/date.js'; 

import * as errorMod from '../modules/error.js';


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },    
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: true
    },
    rank:  {
        type: String,
        default: 'bronze',
        lowercase: true,
        trim: true,
        enum: ['bronze','silver','gold']
    }
});
const Customer = mongoose.model('Customers',customerSchema);





export function getAllCustomers(page=0){ return new Promise( async (resolve,reject)=>{
    try {
        
        const pageNumber = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const customers = await Customer
        .find()
        .select('-_id -__v')
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize);

        if(customers.length)
        return resolve(customers);
        else 
        errorMod.throwError('Empty','Customers empty!');
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }       
});}

export function getCustomerByName(name) { return new Promise(async(resolve,reject)=>{
    try {
        // validate input
        const validateError = validator.customer({
            name
        });
        if(validateError) 
        errorMod.throwError('InvalidInput',validateError.details[0].message);
        
        const customerFound = await Customer
        .findOne({
            name
        })
        .select({
            name: 1,
            rank: 1,
            __v: 0
        });

        if(customerFound)
        return resolve(customerFound);
        else 
        errorMod.throwError('NotFound','Customer not found!');


    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }   

});}



export function sendCustomerEmail(customer) { return new Promise(async (resolve,reject)=>{
    try {
        const emailSent = await simulateEmail(customer.name);
        resolve(emailSent);
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }        
});}



export function addCustomer(name,age,rank) { return new Promise(async(resolve,reject)=>{
    try {
        const validateError = validator.customer({name});
        if(validateError)
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        // Add customer here to db
        const customerNew = new Customer({
            name: name,
            age: age,
            rank: rank
        });
        const retVal =  await customerNew.save();
        resolve(retVal);

    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }    
});}




export function updateCustomer(id,name,rank) {return new Promise(async(resolve,reject)=>{
    try {
        const validateError = validator.customerUpdate({
            id,
            name,
            rank
        });
        if(validateError) 
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        const set = (rank)? {
            name, rank 
        } : {
            name
        };

        const customerUpdate = await Customer.findOneAndDelete({
            _id: id
        },{
            $set: set
        }, {
            new: true
        });
        if(customerUpdate) {
            resolve(customerUpdate);
        } else {
            errorMod.throwError('NotFound','Update failed! Customer not found!');
        }

    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}






export function deleteCustomer(id){return new Promise(async(resolve,reject)=>{
    try {
        const validateError = validator.customerDelete({id});
        if(validateError) 
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        const customerDeleted = await Customer.findOneAndDelete({_id:id});
        if(customerDeleted)
        resolve(customerDeleted);
        else
        errorMod.throwError('NotFound','Delete failed! Customer not found!');

    } catch (error) {
        errorMod.catchRejectError(error,reject);
    }
});}






















function simulateEmail(name){return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        try {
            resolve(true);
    
            // throw error if needed when error is not sent
            // errorMod.throwError('EmailFailed',`Customer: ${name}'s email not sent!`);
        } catch (error) {
            errorMod.catchRejectError(error ,reject);
        }
    },2000);        
});}













export async function testing(name,rank) {
    const asd = new TestAsync();
    const retVal =  await asd.savePromise();
    defaultDebug('retVal',retVal);
    return retVal;
}


class TestAsync {
    savePromise(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve('savePromise().....');
            },3000);    
        });
    }

    save(){
        setTimeout(()=>{
            defaultDebug('save() log');
            return 'save()';
        },3000);
        defaultDebug('mmmmmmmmmm');
    }

}


