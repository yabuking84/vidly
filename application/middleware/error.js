import debug from '../modules/debug.js';
import logger from '../modules/logger.js';

function middleware(error,request,response,next){
    try {
        debug.error(`Middleware Error (${error.name}):`,error.message);
        
        let status = 400;
        
        if(error.name == 'NotFound')
        status = 404;
        else if(error.name == 'MongooseServerSelectionError') 
        status = 500;
        else if(['InvalidRole','InvalidToken'].includes(error.name)) 
        status = 403;

        logger.error(error);

        return response.status(status).send(error.message);
    } catch (err) {
        debug.error(err);
        debug.error('Middleware Error (Try Catch):',err);
        let status = 500; 
        return response.status(status).send(err);
    }
}



export default  {
    middleware
};