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


router.get('/:id',async (req,res)=>{
    try {
        const genreFound = await genre.getGenre(req.params.id);
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



// module.exports = router;
export default router;
