import genres from '../controller/genres.js';
import customers from '../controller/customers.js';
import movies from '../controller/movies.js';
import rentals from '../controller/rentals.js';
import users from '../controller/users.js';
import auth from '../controller/auth.js';



// console.log((global);

function init(app){
    app.use('/api/genres',genres);
    app.use('/api/customers',customers);
    app.use('/api/movies',movies);
    app.use('/api/rentals',rentals);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    
    
}


export default {
    init
};