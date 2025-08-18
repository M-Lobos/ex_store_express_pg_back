import express, { urlencoded } from 'express';

import { serverInit } from './services/serverInit.js';
import UserRouter from './routes/usuario.routes.js'

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares para parseo de de contenido desde el body en json y multiformato
app.use(express.json());
app.use(urlencoded({ extended: true }));

//middleware para rutas
app.use('/api/v1/', UserRouter);

//levantamiento servidor y conexión de DB
serverInit(app, PORT);

