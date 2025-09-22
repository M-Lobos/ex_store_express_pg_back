import { InternalServerError } from "../../errors/TypesOfErrors.js";
import { Validation } from "../validate/Validate.js";

/**
 * Convierte datos de una petición(request) en arrays de columnas y valores para inyectarlos en una consulta(query)SQL
 * @param {object} data         - Objeto de datos que contiene columnas y valores para consulta SQL  
 * @returns {object<Array>}     - Devuelve Objeto con dos arrays en los campos columns y values.
 */

export const parseObjectToColumnValuesArray = (data) => {
    try {

        const columnsData = [];
        const valuesData = [];

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                columnsData.push(key)
                value.forEach((val) => {

                    valuesData.push(val)
                })
            } else {
                columnsData.push(key)
                valuesData.push(value)
            }
        })

        /* const columnsData = Object.keys(data);
        const valuesData = Object.values(data); */

        const { columns, values } = Validation.isDataEmptyToDataBase(columnsData, valuesData)
        return {
            columns, values
        }
    } catch (error) {
        throw new InternalServerError("Error al convertir los datos a columnas y valores", error)
    }
}

/**
 * Construye una clausula con valores parametrizados en función de la cantida de campos en los datos entregados
 * @param {Array<string>} columns   - Columnas que se modifican en la query
 * @param {string} separator        - Separador de condición o agergacioón en la clausula
 * @param {number} initParam        - Número con el que comienza la cuenta los valores parametrizados. por defecto es 1
 * @param {boolean} requiredKey     - Valor booleano que determina si la clausula requiere acompañar los vlaores parametrizados con una key
 * @returns {string}                - Retorna clausula con datos paramertizados en formato string
 */

export const normalizeClause = (columns, separator, requiredKey = true, initParam = 1, filters = {}) => {
    try {
        /*let clauses = '';
        !requiredKey ? clauses = columns.map((_, i) => `$${i + initParam}`).join(` ${separator} `)
            : clauses = columns.map((key, index) => `${key} = $${index + initParam}`).join(` ${separator} `);
            return clauses
        */

        let clauses = '';

        if (!requiredKey) {
            clauses = columns.map((_, index) => `$${index + initParam}`).join(` ${separator} `);
        } else {
            const clausesFilter = columns.map((key, index) => {
                if (Array.isArray(filters[key]) && filters[key].length === 2) {
                    return `${key} BETWEEN $${index + initParam} AND $${index + initParam + 1} `
                } else {
                    return `${key} = $${index + initParam}`;
                }

            });
            clauses = clausesFilter.join(` ${separator} `);
        }

        return clauses

    } catch (error) {
        throw InternalServerError(`Error al consturir la clausula para la consulta SQL`, error)
    }
}
