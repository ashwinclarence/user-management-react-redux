
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const connectDB = async () => {
    try {

        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

        if (connect) {
            console.log("mongoose connected");
            
        }
        
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;