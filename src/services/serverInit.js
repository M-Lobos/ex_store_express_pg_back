import { connectDB } from "../utils/connectDB.js"


export const serverInit = async (app, PORT) => {
    try {
        console.log(`Verificando conexión con PosgreSQL`);
        const { now } = await connectDB();
        console.log(`Conexión exitosa realizada al ${now}`);

        app.listen(PORT, () => {
            console.log(`Servidor andando en el puerto ${PORT}👽`)
        })
    } catch (error) {
        console.error(error.message);
    }
}