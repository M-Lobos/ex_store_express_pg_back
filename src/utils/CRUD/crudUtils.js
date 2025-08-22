import { InternalServerError } from "../../errors/TypesOfErrors.js";
import { query } from "../../config/db.config.js";

/**
 * Crea un nuevo registro en una tabla específica a través de un objeto
 * @param {string} tableName - Nombre de la tabla en la base de datos.
 * @param {object} data - Datos en formato de objeto que se envían para registro en tabla de nombre tableName
 * @returns {Promise<object>} - Retorna el registro creado en formato Objeto
 */

export const createRecord = async (tableName, data) => {

    try {
        const columns = Object.keys(data);                       //devuelve un array con las key de un objeto dado
        const values = Object.values(data);              //devuelve un array con los values de un objeto dado
        const placeholders = columns.map((_, i) => `$${i + 1}`)     //Se transforman los datos para que lleguen las
        //posiciones parametrizadas

        const insertQuery = ` 
            INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${placeholders.join(`, `)})
            RETURNING *
        `
        const { rows } = await query(insertQuery, values);
        return rows[0];

    } catch (error) {
        throw new InternalServerError(`Error al registrar datos en la tabla ${tableName}`)
    }
}

