import { InternalServerError } from "../../../errors/TypesOfErrors.js";
import { query } from "../../../config/db.config.js";
import { normalizeClause, parseObjectToColumnValuesArray } from "../../shares/normalize.js";

/**
 * Obtiene todos los registros activos de una tabla consultada
 * @param {string} tableName    - Nombre de la tabla a consultar
 * @returns {Promise<Array>}    - Retorna un arreglo de forma asíncrona de todos los resgistros de la tabla
 */

export const findAllActiveRecords = async (tableName) => {
    try {

        const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE active = true;
        `

        const { rows } = await query(selectQuery);
        return rows

    } catch (error) {
        throw new InternalServerError(`Error al obtener resgristros de las tablas ${tableName}`)
    }
}

/**
 * Obtiene un registro que esté activo, a través de un id {UUID} dado para una tabla en particular
 * @param {string} tableName - tabla que se desea consultar
 * @param {string} id        - id {UUID} del registro que se busca
 * @returns {Promise<Object>} - Retorna un registro basado en el id {UUID} y que esté activo
 */

export const findActiveRecordById = async (tableName, id) => {
    try {
        const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE id = $1
            AND active = true
        `
        const { rows } = await query(selectQuery, [id]);
        return rows[0];

    } catch (error) {
        throw new InternalServerError(`Error al obtener registro ${id} en la tabla ${tableName}`)
    }
}

/**
 * Busca dentro de una tabla en una base datos a través de un filtro simple en formato de objeto y condición SQL AND / OR
 * @param {string} tableName    - nombre de la tabla que se consulta
 * @param {object} filters      - objeto con los filtros que contiene nombre el campo, y el valor a buscar  
 * @param {string} condition    - Condición lógica de búsqueda (AND/OR)
 * @returns {Promise<Array>}    - retorna un arreglo con los objetos del resultado de la búsqueda
 */

export const findRecordByFilter = async (tableName, filters, condition) => {
    try {
        const { columns, values } = parseObjectToColumnValuesArray(filters);
        const whereClause = normalizeClause(columns, condition, 1, true, filters);

        const selectQuery = `
            SELECT * FROM ${tableName}
            WHERE ${whereClause}
        `;

        console.log(selectQuery);

        const { rows } = await query(selectQuery, values)
        return rows;

    } catch (error) {

        throw new InternalServerError(`
            Error al consultar la tabla ${tableName} con los filtros:
            ${JSON.stringify(filters)}
            `, error)
    }
}

