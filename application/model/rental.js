import mongoose from 'mongoose';
import { rentalSchema } from '../schema/rental.js';


const Model = mongoose.model('rentals',rentalSchema);

export default Model;
