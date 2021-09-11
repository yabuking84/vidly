import mongoose from 'mongoose';
import { movieSchema } from '../schema/movie.js';


const Model = mongoose.model('movies',movieSchema);

export default Model;
