import express from 'express';
import {
    add_expense,
    view_expense,
    view_expense_by_catergory,
    set_budget,
    view_expenses_in_range,
    delete_expense,
    get_budget,
    get_today_expense,
} from '../controllers/expenseController.js';

import {isAuthenticated} from '../middlewares/auth.js';

const router = express.Router();


router.post('/add',isAuthenticated,add_expense);

router.get('/view',isAuthenticated,view_expense);

router.get('/view/:category',isAuthenticated,view_expense_by_catergory);

router.get('/dailyExpense',isAuthenticated,get_today_expense);

router.post('/setBudget',isAuthenticated,set_budget);

router.get('/getBudget',isAuthenticated,get_budget);

router.post('/ViewExpenseRange',isAuthenticated,view_expenses_in_range);

router.get('/delete/:id',isAuthenticated,delete_expense);






export default router;