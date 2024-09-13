

import mongoose from "mongoose";


const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type:String
    }
}, { timestamps: true });


export default mongoose.model('Students', studentSchema)
