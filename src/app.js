import express, { urlencoded } from 'express';

import { serverInit } from './services/serverInit.js';


const app = express();
const PORT = process.env.PORT || 3000;

//middlewares para parseo de de contenido desde el body en json y multiformato
app.use(express.json());
app.use(urlencoded({ extended: true }));



//levantamiento servidor
serverInit(app, PORT)