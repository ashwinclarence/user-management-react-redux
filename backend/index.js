

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';

const app = express();
dotenv.config();

app.use(express.json())

// mongodb connection
connectDB();

// port for running the server
const port = process.env.PORT || 3000;



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
})