import userSchema from '../models/studentModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandle } from '../utils/error.js'; 
import jwt from 'jsonwebtoken'

export const signUp = async (req, res,next) => {
    try {

        // this is from the body of registration page 
        const { name, password, email } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({status:'failed',message:"All fields are important"})
        }

        // hash the password 
        const hashPassword=await bcryptjs.hash(password,10)

        const newUser = new userSchema({
            name:name,
            password:hashPassword,
            email:email
        })

        await newUser.save()
        
        res.status(201).json({status:"success",message:"New user registration is successful"})
        
    } catch (error) {
        console.log("Error on user sign in ", error);
        next(error)
        
    }
}


export const signIn = async (req, res, next) => {
    try {

        // data from body
        const { email, password } = req.body;

        // here first check the username is already exist in the database;
        let existUser = await userSchema.findOne({ email });

        // if user not exist then throw an error
        if (!existUser) {
            return next(errorHandle(404, 'User not found'));
        }

        let checkPassword = await bcryptjs.compare(password, existUser.password);

        // if the password does not match with user
        if (!checkPassword) {
            return next(errorHandle(401, 'Invalid Credentials'));
        }

        // remove the password
        const { password: hashedPassword, ...rest } = existUser._doc;

        // create a jwt token
        const token = jwt.sign({ id: existUser._id }, process.env.JWT_SECRET);

        const cookieExpiry = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

        res.cookie('access_token', token, { httpOnly: true,maxAge:cookieExpiry }).status(200).json(rest);


    } catch (error) {
        next(error);
        
    }
}