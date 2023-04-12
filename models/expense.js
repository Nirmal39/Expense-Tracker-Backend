import mongoose from "mongoose";


const schema = new mongoose.Schema(
{
    id: String,
    date: Date,
    amount:{
        type: mongoose.Types.Decimal128,
        required: true
    },desc:{
        type: String,
        required: true
    },category: String
},{timeStamps: true}
);

export const Expense = mongoose.model('Expense', schema);