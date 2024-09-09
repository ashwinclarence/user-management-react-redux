

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

const app = express();
dotenv.config();

app.use(express.json())

// mongodb connection
connectDB();

// port for running the server
const port = process.env.PORT || 3000;


app.get('/', (req, res) => {
    try {
        res.json({message:"welcome to the first route"})
    } catch (error) {
        console.log(error);
        
    }
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
})