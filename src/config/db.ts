import mongoose from 'mongoose';
import { envconfig } from './env';



const dbConnection = async () => {
    try {
        await mongoose.connect(envconfig.mongo_db_url, { });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default dbConnection;
