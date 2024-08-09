import express from 'express';
import cors from 'cors';
import connectToDB from './config/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import passwordRouter from './routes/passwordRoute.js'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
config();

const app = express();

connectToDB();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

// MIDDLEWARES
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Custom middleware to set headers if needed
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  next();
});

// ROUTES
app.use('/api/v1/user', userRouter);
app.use('/api/v1/my-passwords', passwordRouter);


app.use('/ping',(req,res)=>{
  res.json('PONG')
})
app.all('*', (req, res) => {
    res.status(404).json('Page not found!');
});

export default app;
