import mongoose from 'mongoose';
import { customerSchema } from '../schema/customer.js';


const Model = mongoose.model('customers',customerSchema);

export default Model;
