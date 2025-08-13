import { createDBTable } from "../utils/db/createDBTables.js"
import { createTableQueries } from "../utils/constants/createTableQueries.js"

import { connectDB } from "../utils/db/connectDB.js"

export const initializeDB = async () => {
    try {
        for (const query of createTableQueries) {
            await createDBTable(query)
        }

        console.log('Tablas cargadas con éxito')

        const { now } = await connectDB();
        console.log(`Conexión exitosa realizada al ${now}`);

    } catch (error) {
        console.error(`Error al inicializar la base de datos en PostgreSQL`)
    }
}