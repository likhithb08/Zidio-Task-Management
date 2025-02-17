import env from '../config/env.js'; 

const { MONGO_URI, NODE_ENV } = env; 
import mongoose from 'mongoose';


if(!MONGO_URI){
  throw new Error('Please provide a valid MongoDB URI inside the .env file');
}

const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(MONGO_URI);
    
        console.log(`MongoDB Connected: ${conn.connection.host , NODE_ENV}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;