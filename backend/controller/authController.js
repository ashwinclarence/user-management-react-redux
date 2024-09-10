import userSchema from '../models/studentModel.js'
import bcryptjs from 'bcryptjs'

export const signIn = async (req, res) => {
    try {

        const { username, password, email } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({status:'failed',message:"All fields are important"})
        }

        const hashPassword=await bcryptjs.hash(password,10)

        const newUser = new userSchema({
            username,
            password:hashPassword,
            email
        })

        await newUser.save()
        
        res.status(201).json({status:"success",message:"New user registration is successful"})
        
    } catch (error) {
        console.log("Error on user sign in ", error);
        res.status(500).json(error.message)
        
    }
}