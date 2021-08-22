import * as validator from '../modules/validator.js';

import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

import * as errorMod from '../modules/error.js';

import mongoose from 'mongoose';

import { genreSchema } from '../schema/genre.js';

const Genre = mongoose.model('Genres',genreSchema);




export function getAllGenres(page=0){ return new Promise(async (resolve, reject)=>{
    try {
           
        const pageNum = (page>0)?page:1;
        const pageSize = (page>0)?3:0;

        const genresFound = await Genre
        .find()
        .select('-__v')
        .skip((pageNum-1)*pageSize)
        .limit(pageSize);

        if(genresFound.length)
        return resolve(genresFound);
        else 
        errorMod.throwError('Empty','Genres empty!');        
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }

});}

export function getGenreByName(name){ return new Promise(async (resolve, reject)=>{
    try {
        // validate input
        const validateError = validator.genre({
            name
        });
        if(validateError) 
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        const genreFound = await Genre
        .findOne({name})
        .select({
            name:1
        });

        if(genreFound)
        return resolve(genreFound);
        else 
        errorMod.throwError('NotFound','Genre not found!');    

    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}


export function countGenre(genreId){return new Promise(async(resolve,reject)=>{
    try {
        const qty = await Genre.countDocuments({_id:genreId});
        resolve(qty);
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}


export function addGenre(name){ return new Promise(async (resolve, reject)=>{
    try {
        // validate input
        const validateError = validator.genre({
            name
        });
        if(validateError) 
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        const genreNew = new Genre({
            name: name
        });
        const retVal = await genreNew.save();
        resolve(retVal);
        
        
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }

});}



export function updateGenre(id,name){return new Promise(async (resolve,reject)=>{
    try {
        const validateError = validator.genreUpdate({id,name});
        if(validateError)
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        const genreUpdated = await Genre.findOneAndUpdate({
            _id: id
        },{
            $set: {
                name
            }
        }, {
            new: true
        });
        if(genreUpdated)
        resolve(genreUpdated);
        else
        errorMod.throwError('NotFound','Update failed! Genre not found!');

    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}


export function deleteGenre(id){return new Promise(async(resolve,reject)=>{
    try {
        const validateError = validator.genreDelete({id});
        if(validateError)
        errorMod.throwError('InvalidInput',validateError.details[0].message);

        const genreDeleted = await Genre.findOneAndDelete({
            _id: id
        });
        if(genreDeleted)
        resolve(genreDeleted);
        else
        errorMod.throwError('NotFound','Delete failed! Genre not found!');        
        
    } catch (error) {
        errorMod.catchRejectError(error ,reject);
    }
});}