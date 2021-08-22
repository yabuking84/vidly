import Joi from 'joi';

const schemaGenre = {
    "name": Joi.string().min(2).required()
};

const schemaGenreUpdate = {
    "id": Joi.string().min(10).required(),
    "name": Joi.string().min(2).required(),
};

const schemaGenreDelete = {
    "id": Joi.string().min(10).required()
};

const schemaCustomer = {
    "name": Joi.string().min(2).required(),
    "rank": Joi.string().min(2)
};

const schemaCustomerDelete = {
    "id": Joi.string().min(10).required()
};

const schemaCustomerUpdate = {
    "id": Joi.string().min(10).required(),
    "name": Joi.string().min(2).required(),
    "rank": Joi.string().min(2)
};


export function genre(data){
    return Joi.object(schemaGenre).validate(data).error;
}

export function genreDelete(data){
    return Joi.object(schemaGenreDelete).validate(data).error;
}

export function genreUpdate(data){
    return Joi.object(schemaGenreUpdate).validate(data).error;
}

export function customer(data){
    return Joi.object(schemaCustomer).validate(data).error;
}

export function customerDelete(data){
    return Joi.object(schemaCustomerDelete).validate(data).error;
}

export function customerUpdate(data){
    return Joi.object(schemaCustomerUpdate).validate(data).error;
}
