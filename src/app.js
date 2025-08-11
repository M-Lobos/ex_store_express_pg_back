import express, { urlencoded } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares para parseo de de contenido desde el body en json y multiformato
app.use(express.json());
app.use(urlencoded({ extended: true }));



//levantamiento servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT} 👽`)
});