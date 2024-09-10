

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoute.js'


const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// mongodb connection
connectDB();

// port for running the server
const port = process.env.PORT || 3000;



app.use('/api/user', userRouter)
app.use('/api/auth',authRouter)


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    
})