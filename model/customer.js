import * as validator from '../modules/validator.js';

// test development git

import debug from 'debug';
const defaultDebug = debug('app:default');
const dbDebug = debug('app:db');

import DateSchema from './schema/date.js'; 

import * as errorMod from '../modules/error.js'

// db connection
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost/vidly')
.then(()=>{
    defaultDebug('Connected to MongoDB..');
})
.catch((error)=>{
    dbDebug('DB Connection Error: ', error);
});

const customerSchema = new mongoose.Schema({
    name: String,
    rank: String
});
const Customer = mongoose.model('Customers',customerSchema);


// const customers = [
//     {id:1, name:'tawing', rank: 'silver'},
//     {id:2, name:'eithel', rank: 'gold'},
//     {id:3, name:'rene', rank: 'bronze'},
//     {id:4, name:'joy', rank: 'bronze'}
// ];




export function getAllCustomers(page=0){ return new Promise( async (resolve,reject)=>{
    try {
        
        const pageNumber = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const customers = await Customer
        .find()
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize);

        if(customers.length)
        return resolve(customers);
        else {
            const error = new Error('Customers empty!');
            error.name = 'Empty';
            return reject(error);
        }
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
        .find({
            name
        })
        .limit(1)
        .select({
            name: 1,
            rank: 1
        });

        if(customerFound.length)
        return resolve(customerFound);
        else 
        errorMod.throwError('NotFound','Customer not found!');
                

    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }   

});}



export function sendCustomerEmail(customer) { return new Promise((resolve,reject)=>{
    setTimeout(()=>{
        // let error = new Error(`Customer: ${customer.name}'s email not sent!`);
        // error.name = 'EmailFailed';
        // return reject(error);
        return resolve(1);
    },1000);
});}



export function addCustomer(name,rank) { return new Promise(async(resolve,reject)=>{
    try {
        const validateError = validator.customer({name});
        if(validateError)
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        if(typeof(myVariable) == "undefined" || !rank)
        rank = 'bronze';

        // Add customer here to db
        const customerNew = new Customer({
            name: name,
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

        const customerUpdate = await Customer.findByIdAndUpdate(id,{
            $set: set
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


