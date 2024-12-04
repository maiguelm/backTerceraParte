import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { initMongoDB } from './dao/connection.js';
import dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
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
const PORT = process.env.PORT || 8080;
if (process.env.PERSISTENCE === "MONGO") initMongoDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Adoptme API",
			version: "1.0.0",
			description: "API para gestionar mascotas y adoptantes"
		},
		servers: [
			{
				url: `http://localhost:${PORT}`
			}
		],
	},
	apis: [
		"./src/routes/users.router.js",
		"./src/routes/pets.router.js",
		"./src/routes/adoption.router.js",
		"./src/routes/sessions.router.js",
		"./src/routes/mocks.router.js",
		"./src/app.js"
	]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
	app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }

export default app;