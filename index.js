import express from 'express';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.js';
import expenseRouter from './routes/expense.js';
import cors from 'cors';
import {connectDB} from './data/database.js'
import { errorMiddleWare } from './middlewares/error.js';

config({
    path: './data/config.env'
})

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))


app.use('/api/v1/users',userRouter);
app.use('/api/v1/expense',expenseRouter);


app.get('/', (req,res)=>{
    res.send('Hello')
})

app.use(errorMiddleWare);

app.listen(process.env.PORT, () => {
    console.log(
      `Server is working on port:${process.env.PORT} in ${process.env.NODE_ENV} mode`
    );
  });