import debug from 'debug';
const defaultDebug = debug('app:default');
const errorDebug = debug('app:error');

export function catchResultError(error,res) {
    try {
        errorDebug('Result Error:',error.message);
        let status = 400; 
        if(error.name == 'NotFound') status = 404;
        return res.status(status).send(error.message);
    } catch (err) {
        errorDebug(err);
        errorDebug('Result catchResultError Error:',err);
        let status = 400; 
        return res.status(status).send(err);
    }        
}



export function catchRejectError(error,reject){
    try {
        // errorDebug('Promise Error:',error.message);
        return reject(error);
    } catch (err) {
        // errorDebug('Promise catchRejectError Error:',err);
        return reject(err);
    }      
}




export function throwError(errorName,errorMessage){
    const error = new Error(errorMessage);
    error.name = errorName; 
    throw error;
}
