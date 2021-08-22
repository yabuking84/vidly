import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

export function catchResultError(error,result) {
    try {
        errorDebug('Result Error:',error.message);
        let status = 400;  
        if(error.name == 'NotFound') status = 404;
        return result.status(status).send(error.message);
    } catch (err) {
        errorDebug(err);
        errorDebug('Result catchResultError Error:',err);
        let status = 400; 
        return result.status(status).send(err);
    }        
}



export function catchRejectError(error,reject){
    try {
        // check if iit from mongoose validation error
        if(error.name === 'ValidationError' ) {
            errorDebug('ValidationError Error:',error.message);
            for(let field in error.errors) {
                errorDebug('ValidationError error.errors:',error.errors[field]);
            }
            return reject(error);
        }
        else
        return reject(error);
    } catch (err) {
        return reject(err);
    }      
}




export function throwError(errorName,errorMessage){
    const error = new Error(errorMessage);
    error.name = errorName; 
    throw error;
}


export function getError(errorName,errorMessage){
    const error = new Error(errorMessage);
    error.name = errorName; 
    return error;
}
