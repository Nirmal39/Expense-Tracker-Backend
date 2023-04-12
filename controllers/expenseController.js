import {User} from '../models/user.js';
import {Expense} from '../models/expense.js';
import moment from 'moment';
import ErrorHandler from '../middlewares/error.js';


export const add_expense = async (req,res,next)=>{
    try {
        let { date, amount, desc, category } = req.body;

        const id = req.user._id;

        if(typeof date != "Object"){
            date = new Date(date)
        }

        const expense = await Expense.create({
            id,
            date,
            amount,
            desc,
            category
        });

        res.status(201).json({
            success: true,
            message: "Expense Added succesfully"
        })

    } catch (error) {
        next(error);
    }
}


export const view_expense =async (req,res,next)=>{
    try {
        const id = req.user._id;

        const expenses = await Expense.find({id}).sort({date:-1});
        
        res.status(200).json({
            success: true,
            Expenses: expenses
        });

    } catch (error) {
        next(error)
    }
}


export const view_expense_by_catergory =async (req,res,next)=>{
    try {
        const id = req.user._id;
        
        const category = req.params.category;
        
        const expenses = await Expense.find({id,category}).sort({date:-1});

        res.status(200).json({
            success: true,
            Expenses: expenses
        });
        

    } catch (error) {
        next(error)
    }
}


export const set_budget =async (req,res,next)=>{
    try {
        const id = req.user._id;
        const {budget} = req.body;

        if(!budget) return next(new ErrorHandler("Please Enter Budget",400));

        const user = await User.findByIdAndUpdate(
            id,
            {budget},
            {upsert: true}
        );

        res.status(200).json({
            success: true,
            user : user
        })

    } catch (error) {
        next(error)
    }
}


export const view_expenses_in_range =async (req,res,next)=>{
    try {
        const id = req.user._id;
        let {startDate,endDate} = req.body;
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        
        const expenses = await Expense.find({
            id,
            date:{ $gte: startDate, $lte: endDate }
        }).sort({date:-1});
        res.status(200).json({
            success: true,
            Expenses: expenses
        })
    } catch (error) {
        next(error)
    }
}


export const delete_expense =async (req,res,next)=>{
    try {
        const id = req.params.id;
        const expenses = await Expense.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            Expenses: expenses
        })
    } catch (error) {
        next(error)
    }
}


export const get_budget =async (req,res,next)=>{
    try {
        const id = req.user._id;
        const user = await User.findById(id);

        res.status(404).json({
            success: true,
            Budget: user.budget
        })
    } catch (error) {
        next(error)
    }
}


export const get_today_expense = async (req,res)=>{
    try {
        const id = req.user._id;

        const expenses = await Expense.find({id}).sort({date:-1})

        let filterData = [];
        for(let i = 0; i< expenses.length;i++){
            
            if(
                expenses[i].date.toString().substring(0,15) ===
                moment().format("ddd MMM DD YYYY")
            ){
                filterData.push(expenses[i]);
            }
        }
        Object.assign({}, filterData);

        res.status(200).json({
            success: true,
            expenses: filterData
        })

    } catch (error) {
        next(error)
    }
}
