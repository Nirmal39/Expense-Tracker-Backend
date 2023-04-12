import mongoose from "mongoose";
import pkg from 'validator';

const { isEmail } = pkg;


const schema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: true,
        validate: isEmail,
        lowercase: true,
    },
    password:{
        type: String,
        select: false,
    },
    budget:{
        type: mongoose.Types.Decimal128,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

export const User = mongoose.model('User', schema);