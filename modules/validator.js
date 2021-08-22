import Joi from 'joi';
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);




export function genre(data){
    const schema = {
        "name": Joi.string().min(2).required()
    };    
    return Joi.object(schema).validate(data).error;
}

export function genreDelete(data){
    const schema = {
        "id": Joi.objectId().required()
    };
    return Joi.object(schema).validate(data).error;
}

export function genreUpdate(data){
    const schema = {
        "id": Joi.objectId().required(),
        "name": Joi.string().min(2).required(),
    };        
    return Joi.object(schema).validate(data).error;
}

export function customer(data){
    const schema = {
        "name": Joi.string().min(2).required(),
        "rank": Joi.string().min(2)
    };
    return Joi.object(schema).validate(data).error;
}

export function customerDelete(data){
    const schema = {
        "id": Joi.objectId().required()
    };    
    return Joi.object(schema).validate(data).error;
}

export function customerUpdate(data){
    const schema = {
        "id": Joi.objectId().required(),
        "name": Joi.string().min(2).required(),
        "rank": Joi.string().min(2)
    };    
    return Joi.object(schema).validate(data).error;
}


export function movie(data) {
    const schema = {
        "name": Joi.string().min(2).required(),
        "genreId": Joi.objectId().required(),
        "inStock": Joi.number().integer().min(0).max(999)
    };    
    return Joi.object(schema).validate(data).error;
}


export function movieUpdate(data) {
    const schema = {
        "id": Joi.objectId().required(),
        "name": Joi.string().min(2).required(),
        "genreId": Joi.objectId(),
    };    
    return Joi.object(schema).validate(data).error;
}

export function movieDelete(data) {
    const schema = {
        "id": Joi.objectId().required()
    };    
    return Joi.object(schema).validate(data).error;
}