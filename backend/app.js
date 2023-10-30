import express from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import userRouter from './routes/user.routes.js';

const app = express();

const accessLogStream = fs.createWriteStream(path.join(process.cwd(), 'access.log'), {
  flags: 'a',
});

morgan.token('requestId', req => req.id);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(function (req, _res, next) {
  req.id = crypto.randomUUID();
  next();
});

app.use(
  morgan(
    ':requestId - [:date[iso]] :method :url HTTP/:http-version :status :res[content-length] - :response-time ms ":referrer" ":user-agent"',
    { stream: accessLogStream }
  )
);

app.use('/api/v1', userRouter);

export default app;
