import Joi from 'joi';

const schemaGenre = {
    "name": Joi.string().min(2).required()
};

const schemaCustomer = {
    "name": Joi.string().min(2).required(),
    "rank": Joi.string().min(2)
};

const schemaCustomerUpdate = {
    "id": Joi.string().min(10).required(),
    "name": Joi.string().min(2).required(),
    "rank": Joi.string().min(2)
};


export function genre(data){
    return Joi.object(schemaGenre).validate(data).error;
}

export function customer(data){
    return Joi.object(schemaCustomer).validate(data).error;
}

export function customerUpdate(data){
    return Joi.object(schemaCustomerUpdate).validate(data).error;
}
