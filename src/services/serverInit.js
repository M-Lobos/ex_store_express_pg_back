
import { initializeDB } from "./initializeDB.js";


export const serverInit = async (app, PORT) => {
    try {
        console.log(`Verificando conexión con PosgreSQL`);
        await initializeDB();

        app.listen(PORT, () => {
            console.log(`Servidor andando en el puerto ${PORT}👽`)
        })
    } catch (error) {
        console.error(error.message);
    }
}