import { query } from "../../config/db.config.js"
import { DataBaseError } from "../../errors/TypesOfErrors.js";
import { getTableDetails, tableExists } from "./tableDetails.js";

export const createDBTable = async ({ queryText, name }) => {
    try {
        const exists = await tableExists(name);
        await query(queryText);
        const tableDetails = await getTableDetails(name);

        if (exists) {
            console.log(`Tabla "${name}" ya existe en la base de datos. Detalles:`)
        } else {
            console.log(`Tabla "${name}" creada y verificada con éxito. Detalle:`)
        }

        console.table(tableDetails);
    } catch (error) {
        throw new DataBaseError(`Error al crear la tabla ${name}`, error)
    }
}


