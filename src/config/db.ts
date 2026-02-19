import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sports-fitness-db');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${(error as Error).message}`);

        // Fallback to in-memory database for development if local mongo is not running
        console.log(`Checking fallback... NODE_ENV=${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV !== 'production') {
            try {
                console.log('Attempting to start in-memory MongoDB...');
                // Dynamic import to avoid bundling issues in production if not needed, 
                // though we moved it to dependencies so it's fine.
                const { MongoMemoryServer } = require('mongodb-memory-server');
                const mongoServer = await MongoMemoryServer.create();
                const uri = mongoServer.getUri();

                const conn = await mongoose.connect(uri);
                console.log(`Fallback: In-Memory MongoDB Connected: ${conn.connection.host}`);

                // Optional: Seed data if falling back to empty in-memory DB? 
                // That might be too much magic, but at least the app starts.
                return;
            } catch (fallbackError) {
                console.error(`Fallback failed: ${(fallbackError as Error).message}`);
            }
        }

        process.exit(1);
    }
};

export default connectDB;
