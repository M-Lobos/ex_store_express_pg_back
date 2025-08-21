import { InternalServerError } from "../../errors/TypesOfErrors.js";


export const createRecord = async (tableName, data) => {
    try {
        const columns = Object.keys(data);                          //devuelve un array con las key de un objeto dado
        const values = Object.values(data);                         //devuelve un array con los values de un objeto dado
        const placeholders = columns.map((_, i) => `$${i + 1}`)     //Se transforman los datos para que lleguen las
                                                                    //posiciones parametrizadas

        const insertQuery = ` 
            INSERT INTO ${tableName} (${columns.join(', ')})
            VALUES (${placeholders.join(`, `)})
            RETURNING *
        `


    } catch (error) {
        throw new InternalServerError(`Error al registrar datos en la tabla ${tableName}`)
    }
}

