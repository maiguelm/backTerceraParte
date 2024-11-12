import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { initMongoDB } from './dao/connection.js';
import dotenv from 'dotenv';
// import cluster from 'cluster';
// import { cpus } from 'os'

dotenv.config();

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

import { errorHandler } from './utils/errorHandler.js'

const app = express();
const PORT = process.env.PORT||8080;
if (process.env.PERSISTENCE === "MONGO") initMongoDB();

// const nroDeCpus = cpus().length
// console.log(nroDeCpus)


app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.use(errorHandler);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

