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
        let userDetail = await userSchema.find({},{password:0}).sort({createdAt:-1})
        
        res.status(200).json(userDetail)
        
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { name } = req.body;

        const userDetail = await userSchema.findByIdAndUpdate(userId, { name },{new:true});

        if (!userDetail) {
            
            return res.status(404).json({ message: "User not found", status:false });
        }

        res.status(200).json({userDetail,message:"user details updated successfully", status:true});
    } catch (error) {
        next(error);
    }
};


export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id; 
        const user = await userSchema.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        res.status(200).json({ status: true, message: "User deleted successfully" });
    } catch (error) {
        
        next(error);
    }
};


export const addNewUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }
        const newUser = new userSchema({
            name,
            email,
            password
        })
        await newUser.save();

        console.log(newUser);
        
        
        res.status(200).json({newUser,status:true,message:"New user created successfully"})
        
    } catch (error) {
        next(error)
    }
}



