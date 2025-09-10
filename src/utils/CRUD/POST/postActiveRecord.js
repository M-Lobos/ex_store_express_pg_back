import { InternalServerError } from "../../../errors/TypesOfErrors.js";
import { query } from "../../../config/db.config.js";
import { normalizeClause, parseObjectToColumnValuesArray } from "../../shares/normalize.js";

/**
 * Crea un nuevo registro en una tabla específica a través de un objeto
 * @param {string} tableName - Nombre de la tabla en la base de datos.
 * @param {object} data - Datos en formato de objeto que se envían para registro en tabla de nombre tableName
 * @returns {Promise<object>} - Retorna el registro creado en formato Objeto
 */

export const createRecord = async (tableName, data) => {

    try {
        const { columns, values } = parseObjectToColumnValuesArray(data);
        const valuesClauses = normalizeClause(columns, ', ', false)

        const insertQuery = ` 
            INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${valuesClauses})
            RETURNING *
        `;

        const { rows } = await query(insertQuery, values);
        return rows[0];
    } catch (error) {
        throw new InternalServerError(`Error al registrar datos en la tabla ${tableName}`)
    }
}

