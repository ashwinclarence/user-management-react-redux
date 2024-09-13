import userSchema from '../models/studentModel.js'
import dotenv from 'dotenv';

dotenv.config();

export const adminLogin = async (req,res,next) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            return res.status(200).json({status:"success",message:"admin login success"})
        }

        return res.status(400).json({status:false,message:"invalid credential"})
        
    } catch (error) {
        next(error)
    }
}


export const userDetails = async (req, res, next) => {
    try {
        let userDetail = await userSchema.find({},{password:0});
        
        res.status(200).json(userDetail)
        
    } catch (error) {
        next(error)
    }
}