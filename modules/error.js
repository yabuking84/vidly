import debug from './debug.js';

function catchResultError(error,result) {
    try {
        debug.error('Result Error:',error.message);
        let status = 400;  
        if(error.name == 'NotFound') status = 404;
        return result.status(status).send(error.message);
    } catch (err) {
        debug.error(err);
        debug.error('Result catchResultError Error:',err);
        let status = 400; 
        return result.status(status).send(err);
    }        
}



function catchRejectError(error,reject){
    try {
        debug.error('Reject Error:',error.message);
        // check if from mongoose validation error
        if(error.name === 'ValidationError' ) {
            debug.error('Mongoose ValidationError Error:',error.message);
            for(let field in error.errors) {
                debug.error('Mongoose ValidationError error.errors:',error.errors[field].message);
            }
            return reject(error);
        }
        else
        return reject(error);
    } catch (err) {
        return reject(err);
    }      
}




function throwError(errorName,errorMessage){
    debug.error('Throw Error:',errorMessage);
    const error = new Error(errorMessage);
    error.name = errorName; 
    throw error;
}


function getError(errorName,errorMessage){
    debug.error('Get Error:',errorMessage);
    const error = new Error(errorMessage);
    error.name = errorName; 
    return error;
}



export default {
    catchResultError,
    catchRejectError,
    throwError,
    getError
};


