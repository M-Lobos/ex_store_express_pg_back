import { NotFoundError, ValidationError, DataBaseError } from "../../errors/TypesOfErrors.js"

export class Validation {

    static isNotEmpty(value, fieldName) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ValidationError(`El campo '${fieldName}' no puede ser una cadena de texto vacía.`);
        }
        return value
    }

    static ValidateName(value, fieldName) {
        const regex = /^[a-zA-ZÁ-ÿñÑ\s]+$/
        if (!regex.test(value)) {
            throw new ValidationError(`El campo '${fieldName}'debe contener sólo letras`);
        }
        return value
    }

    static email(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
        if (!emailRegex.test(value)) {
            throw new ValidationError(`El campo '${value}' debe ser un email válido`);
        }
        return value
    }

    static isNumberInRange(value, min, max, fieldName) {
        const number = Number(value);
        if (isNaN(number)) throw new ValidationError(`El campo '${fieldName}' debe ser un número`);
        if (min > number > max) throw new ValidationError(`El campo '${fieldName}' debe estar entre ${min} y ${max}`);

        return number
    }

    //Para validar que los precios no sean negativos
    static isPositiveInteger(value, fieldName) {
        const number = Number(value);
        if (!Number.isInteger(number) || number <= 0) {
            throw new ValidationError(`El campo '${fieldName}' debe ser un número entero positivo mayor a cero`)
        }
    }

    //Para validar que el stock no sea negativo
    static isNegativeInteger(value, fieldName) {
        const number = Number(value);
        if (!Number.isInteger(number) || number < 0) {
            throw new ValidationError(`El campo '${fieldName}' debe ser un número entero positivo o cero`)
        }
    }

    //Para validar que la fecha sea válida
    static isValidDate(value, fieldName) {
        const date = new Date(value);

        if (isNaN(date.getTime())) throw new ValidationError(`El campo '${fieldName}' debe ser una fecha válida (YYYY-MM-DD)`)
        return date
    }

    //Para validar el código postal
    static postalCode(value, fieldName) {
        const regex = /^\d{7}S/

        if (!regex.test(value)) throw new ValidationError(`El campo '${fieldName}' debe ser un código postal de 7 digitos`)
        return value;
    }

    //Para validar valores Booleanos
    static isBoolean(value, fieldName) {
        if (typeof (value) !== 'boolean') throw new ValidationError(`El campo '${fieldName}' debe ser un Booleano; verdadero o falso`)
        return value;
    }

    static phone(value) {
        const regexPhone = /^\+?569\d{8}$/;
        if (!regexPhone.test(value)) throw new ValidationError(`El número '${value}'no es válido. Debes ingresar un número de teléfono válido en Chile`)

        return value;
    }

    static isDataEmptyToDataBase(columns, values) {
        if (values.length <= 0 || columns.length <= 0) {
            throw new InternalServerError(`Error: no podemos crear registros vacíos`, error)
        }
        return { columns, values }
    }

    static responseIsEmpty(data) {

        if (data.length === 0 || !data) throw new NotFoundError("No es posible encontrar el registro solicitado")
        return data
    }

    static isValidFilter(filters, validFields) {
        const filterKeys = Object.keys(filters);

        for (const key of filterKeys) {
            if (!validFields.includes(key)) {
                throw new DataBaseError(`El campo "${key}" no es válido para esta entidad`,);
            }
        }
    }

}

