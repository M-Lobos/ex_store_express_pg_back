import { InternalServerError } from "../../../errors/TypesOfErrors.js";
import { query } from "../../../config/db.config.js";
import { normalizeClause, parseObjectToColumnValuesArray } from "../../shares/normalize.js";

/**
 * Actualiza los registros de una tabla (tableName) en una DB, identificando registro por id, y reescribiendo sus valores (data)
 * @param {string} tableName    - Nombre de la tabla a actualizar
 * @param {string} id           - Identificador para el registro a actualizar
 * @param {Object} data         - Objeto de datos a actualizar 
 * @returns {Promise<Object>}   - Retorna el regristro actualizado como Objecot
 */

export const updateRecord = async (tableName, id, data) => {
    try {
        const { columns, values } = parseObjectToColumnValuesArray(data);
        const setClauses = normalizeClause(columns, ', ', true, 2);

        const updateQuery = `
            UPDATE ${tableName}
            SET ${setClauses}
            WHERE id = $1
            RETURNING *;
        `
        const params = [id, ...values]

        const { rows } = await query(updateQuery, params)
        return rows[0]

    } catch (error) {
        throw new InternalServerError(`Tuvimos problemas para actualizar el registro`, error)
    }
}