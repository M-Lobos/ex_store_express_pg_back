import { InternalServerError } from "../../../errors/TypesOfErrors.js";
import { query } from "../../../config/db.config.js";
import { findActiveRecordById } from "../GET/getActiveRecords.js";

/**
 * Elimna permanentemente los datos del regristro (id) en la tabla (tableName)
 * @param {string} tableName    - Nombre de la entidad donde se desea hacer el hard delete
 * @param {string} id           - Id del registro que se desea eleminar permanentemente
 * @returns {Promise<Object>}   - Retorna un objeto con los datos del registro eliminado - El método DELETE no devuelve nada
 */
export const permaDeleteRecord = async (tableName, id) => {
    try {
        const recordToDelete = findActiveRecordById(tableName, id)

        const deleteQuery = `
            DELETE ON CASCADE FROM ${tableName}
            WHERE id = $1
            RETURNING *;
        `
        await query(deleteQuery, [id])
        return recordToDelete
    } catch (error) {
        throw new InternalServerError(`Error al eliminar de forma permanente el dato de id ${id}`, error)
    }
}

/**
 * Elimina registro desactivando su acceso pero no lo elimina permanentemente, sino pasando el active de true a false
 * @param {string} tableName    - Nombre de la tabla
 * @param {string} id           - Nombre del id del registro a eliminar de forma lógica, 
 * @returns {Promise<Object>}   - Retorna un objeto con los datos del registro eliminado de forma lógica
 */
export const softDeteleRecord = async (tableName, id) => {
    try {
        const deleteQuery = `
            UPDATE ${tableName}
            SET active = false 
            WHERE id = $1 AND active = true
            RETURNING *;
        `

        const { rows } = await query(deleteQuery, [id]);
        return rows
    } catch (error) {
        throw new InternalServerError(`Error al eliminar el dato de id ${id}`, error)
    }
}

