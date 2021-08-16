import * as validator from '../modules/validator.js';

import debug from 'debug';
const defaultDebug = debug('app:default');

import * as errorMod from '../modules/error.js'

const genres = [
    {id:1, name: "horror"},
    {id:2, name: "action"},
    {id:3, name: "romance"}
];

 

export function getAllGenres(){ return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        if(genres)
        return resolve(genres);
        else 
        errorMod.catchRejectError('Empty','Genres empty!',reject);
    },1000);
});}

export function getGenre(id){ return new Promise((resolve, reject)=>{
    setTimeout(()=>{
        // search for genre by ID
        const genreFound = genres.find((el)=>{
            return el.id === parseInt(id);
        });

        if(genreFound) 
        return resolve(genreFound);
        else 
        return errorMod.catchRejectError('NotFound','Genres not found!',reject);
        
    },1000);
});}


export function addGenre(name){ return new Promise((resolve, reject)=>{

    // validate input
    const validateError = validator.genre({
        name
    });
    if(validateError) 
    return errorMod.catchRejectError('InvalidInput',validateError.details[0].message,reject);

    setTimeout(()=>{
        const genre = {
            id: genres.length+1,
            name: name
        };
        genres.push(genre);
        defaultDebug('All genres:',genres);
        return resolve(genre);
    },1000);
});}

