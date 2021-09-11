import mongoose from 'mongoose';
import debug from '../modules/debug.js';
import logger from '../modules/logger.js';

import config from 'config';


function init(mode='development') {

    let dbConnectionUrl = `${config.get('db.protocol')}`+
        `${config.get('db.username')}:${config.get('db.password')}`+
        `@${config.get('db.url')}`+
        `/${config.get('db.database')}`+
        `?${config.get('db.options')}`;
    
    // when running integration tests
    if(mode=='test') {
        dbConnectionUrl = `${config.get('db.protocol')}`+
        `${config.get('db.username')}:${config.get('db.password')}`+
        `@${config.get('db.url')}`+
        `/${config.get('db.database')}_test`+
        `?${config.get('db.options')}`;    
    }

    mongoose.connect(dbConnectionUrl,{
        'useNewUrlParser': true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        'useUnifiedTopology': true
    })
    .then(()=>{
        debug.def(`Connected to ${config.get('db.url')}/${config.get('db.database')}..`);
    })
    .catch((error)=>{
        debug.db(`DB Connection Error to ${config.get('db.url')}/${config.get('db.database')}: `, error);
        logger.error(error);
    });
}
    
export default {
    init
};