import userSchema from '../models/studentModel.js';
import { errorHandle } from '../utils/error.js';
import bcryptjs from 'bcryptjs';


export const userLoginRender = async (req, res) => {
    try {
        res.json({ message: "this is from controller" })

    } catch (error) {
        console.log(`Error on login page render`);

    }
}

export const updateUser = async (req, res, next) => {
    try {
        if (req.user.id !== req.params.id) {
            return next(errorHandle(401, 'You can update only your account!'));
        }
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        const updatedUser = await userSchema.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}