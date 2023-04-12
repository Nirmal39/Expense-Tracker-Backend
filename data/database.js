import mongoose from "mongoose";


export const connectDB = ()=>{
    mongoose.connect(
        process.env.MONGO_URL,{
            dbName: 'Expense_Backend'
        }
    ).then((c)=> console.log("Database connected Successfully"))
    .catch((err)=> console.log(err))
};