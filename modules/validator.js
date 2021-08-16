import Joi from 'joi';

const schema = {
    "name": Joi.string().min(2).required()
};


export function genre(data){
    return Joi.object(schema).validate(data).error;
}


export function customer(data){
    return Joi.object(schema).validate(data).error;
}