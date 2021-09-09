import mongoose from 'mongoose';
import { genreSchema } from '../schema/genre.js';


const Model = mongoose.model('genres',genreSchema);

export default Model;
