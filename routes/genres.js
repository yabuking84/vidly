import express from 'express';

import * as errorMod from '../modules/error.js';

import * as genre from '../model/genre.js';

const router = express.Router();

router.get('/',async (req,res)=>{
    try {
        const data = await genre.getAllGenres();
        res.send(data);
    } catch (error) {
        errorMod.catchResultError(error,res);   
    }

});

router.get('/page/:page', async (req,res)=>{
    try {
        const data = await genre.getAllGenres(req.params.page);
        res.send(data);
    } catch (error) {
        errorMod.catchResultError(error,res);
    }
});

router.post('/find',async (req,res)=>{
    try {
        const genreFound = await genre.getGenreByName(req.body.name);
        return res.send(genreFound);  
    } catch (error) {
        return errorMod.catchResultError(error,res);
    }
});



router.post('/', async (req,res)=>{
    try {
        const genreAdded = await genre.addGenre(req.body.name);
        return res.send(genreAdded);  
    } catch (error) {
        return errorMod.catchResultError(error,res);
    }
});




router.put('/', async (req,res)=>{
    try {
        const genreUpdated = await genre.updateGenre(req.body.id,req.body.name);
        return res.send(genreUpdated);  
    } catch (error) {
        return errorMod.catchResultError(error,res);
    }
});



router.delete('/delete', async (req,res)=>{
    try {

        const genreDeleted = await genre.deleteGenre(req.body.id);
        return res.send(genreDeleted);  
    } catch (error) {
        return errorMod.catchResultError(error,res);
    }
});



// module.exports = router;
export default router;
