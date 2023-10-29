import express from 'express';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use('/api/v1/auth', userRouter);

export default app;
