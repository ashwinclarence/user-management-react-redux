

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoute.js'
import adminRoute from './routes/adminRoutes.js'
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// mongodb connection
connectDB();

// port for running the server
const port = process.env.PORT || 3000;



app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRoute)



// error handle middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return res.status(statusCode).json({
        status: false,
        message,
        statusCode
    })
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);

})