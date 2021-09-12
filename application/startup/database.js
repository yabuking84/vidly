import mongoose from 'mongoose';
import debug from '../modules/debug.js';
import logger from '../modules/logger.js';

import config from 'config';


async function init(mode='development') {

    let db_protocol = `${config.get('db.protocol')}`;
    let db_username = `${config.get('db.username')}`;
    let db_password = `${config.get('db.password')}`;
    let db_url = `${config.get('db.url')}`;
    let db_database = `${config.get('db.database')}`;
    let db_options = `${config.get('db.options')}`;

    // debug.start("NODE_ENV = ",process.env.NODE_ENV);

    debug.db(`Connecting to ${db_url}/${db_database}...`);

    // when running integration tests
    if(mode=='test') {
        db_database = `${db_database}_test`;
    }

    const dbConnectionUrl = `${db_protocol}`+
        `${db_username}`+
        `:${db_password}`+
        `@${db_url}`+
        `/${db_database}`+
        `?${db_options}`;

    const options = {
        'useNewUrlParser': true,
        'useFindAndModify': false,
        'useCreateIndex': true,
        'useUnifiedTopology': true
    };

    try {
        await mongoose.connect(dbConnectionUrl,options);
        debug.db(`Connected to ${db_url}/${db_database}!`);

    } catch (error) {
        debug.db(`DB Connection Error to ${db_url}/${db_database}: `, error);
        logger.error(error);
        throw error;
    }

}
    
export default {
    init
};