import {
    createAddressTable,
    createProducsTable,
    createSalesProductsTable,
    createSalesTable,
    createUserTable
} from "../utils/db/createDBTables.js"

import { connectDB } from "../utils/db/connectDB.js"

export const initializeDB = async () => {
    try {
        await createUserTable();
        await createAddressTable();
        await createProducsTable();
        await createSalesTable();
        await createSalesProductsTable();

        console.log('Tablas cargadas con éxito')

        const { now } = await connectDB();
        console.log(`Conexión exitosa realizada al ${now}`);

    } catch (error) {
        console.error(`Error al inicializar la base de datos en PostgreSQL`)
    }
}