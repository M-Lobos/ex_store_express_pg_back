import { query } from "../../config/db.config.js";
import { DataBaseError } from "../../errors/TypesOfErrors.js";

export const getTableDetails = async (tableName) => {
    try {
        const queryDictionaty = (`
        SELECT 
            column_name,
            data_type,
            column_default,
            is_nullable
        FROM 
            information_schema.columns
        WHERE
            table_name = $1
        ORDER BY
            ordinal_position
        `)

        const value = [tableName];
        const { rows } = await query(queryDictionaty, value)
        return rows
    } catch (error) {
        throw new DataBaseError(`Error al crear diccionario dela tabla "${tableName}".`, error)
    }
}

export const tableExists = async (tableName) => {
    try {
        const queryExists = `
        SELECT EXISTS(
            SELECT FROM information_schema.tables
            WHERE table_name = $1
        );
    `

        const value = [tableName];

        const { rows } = await query(queryExists, value);

        return rows[0].exists;
    } catch (error) {
        throw new DataBaseError(`Error al verificar si existe la tabla "${tableName}".`, error)
    }
}

