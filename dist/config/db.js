"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sports-fitness-db');
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // Fallback to in-memory database for development if local mongo is not running
        console.log(`Checking fallback... NODE_ENV=${process.env.NODE_ENV}`);
        if (process.env.NODE_ENV !== 'production') {
            try {
                console.log('Attempting to start in-memory MongoDB...');
                // Dynamic import to avoid bundling issues in production if not needed, 
                // though we moved it to dependencies so it's fine.
                const { MongoMemoryServer } = require('mongodb-memory-server');
                const mongoServer = yield MongoMemoryServer.create();
                const uri = mongoServer.getUri();
                const conn = yield mongoose_1.default.connect(uri);
                console.log(`Fallback: In-Memory MongoDB Connected: ${conn.connection.host}`);
                // Optional: Seed data if falling back to empty in-memory DB? 
                // That might be too much magic, but at least the app starts.
                return;
            }
            catch (fallbackError) {
                console.error(`Fallback failed: ${fallbackError.message}`);
            }
        }
        process.exit(1);
    }
});
exports.default = connectDB;
