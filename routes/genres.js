import express from 'express';
const router = express.Router();

import * as errorMod from '../modules/error.js';

import * as genre from '../model/genre.js';


router.get('/',async (request,result)=>{
    try {
        const data = await genre.getAllGenres();
        result.send(data);
    } catch (error) {
        errorMod.catchResultError(error,result);   
    }

});

router.get('/page/:page', async (request,result)=>{
    try {
        const data = await genre.getAllGenres(request.params.page);
        result.send(data);
    } catch (error) {
        errorMod.catchResultError(error,result);
    }
});

router.post('/find',async (request,result)=>{
    try {
        const genreFound = await genre.getGenreByName(request.body.name);
        return result.send(genreFound);  
    } catch (error) {
        return errorMod.catchResultError(error,result);
    }
});



router.post('/', async (request,result)=>{
    try {
        const genreAdded = await genre.addGenre(request.body.name);
        return result.send(genreAdded);  
    } catch (error) {
        return errorMod.catchResultError(error,result);
    }
});




router.put('/', async (request,result)=>{
    try {
        const genreUpdated = await genre.updateGenre(request.body.id,request.body.name);
        return result.send(genreUpdated);  
    } catch (error) {
        return errorMod.catchResultError(error,result);
    }
});



router.delete('/delete', async (request,result)=>{
    try {

        const genreDeleted = await genre.deleteGenre(request.body.id);
        return result.send(genreDeleted);  
    } catch (error) {
        return errorMod.catchResultError(error,result);
    }
});



// module.exports = router;
export default router;
