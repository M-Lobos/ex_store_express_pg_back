import { ValidationError } from "../../errors/TypesOfErrors.js"

export class Validation {

    static isNotEmpty(value, fieldName) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ValidationError(`${fieldName} no puede ser una cadena de texto vacía.`, error);
        }
        return value
    }

    static ValidateName(value, fieldName) {
        const regex = /^[a-zA-ZÁ-ÿñÑ\s]+$/
        if (regex.test(value)) {
            throw new ValidationError(`${fieldName} debe contener sólo letras`);
        }
        return value
    }

    static email(value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g;
        if (emailRegex.test(value)) {
            throw new ValidationError(`${value} debe ser un email válido`);
        }
        return value
    }

    static isNumberInRange(value, min, max, fieldName) {
        const number = Number(value);
        if (isNaN(number)) throw new ValidationError(`${fieldName} debe ser un número`);
        if (min > number > max) throw new ValidationError(`${fieldName} debe estar entre ${min} y ${max}`);

        return number
    }

    //Para validar que los precios no sean negativos
    static isPositiveInteger(value, fieldName) {
        const number = Number(value);
        if (!Number.isInteger(number) || number <= 0) {
            throw new ValidationError(`${fieldName} debe ser un número entero positivo mayor a cero`)
        }
    }

    //Para validar que el stock no sea negativo
    static isNegativeInteger(value, fieldName) {
        const number = Number(value);
        if (!Number.isInteger(number) || number < 0) {
            throw new ValidationError(`${fieldName} debe ser un número entero positivo o cero`)
        }
    }

    //Para validar que la fecha sea válida
    static isValidDate(value, fieldName) {
        const date = new Date(value);

        if (isNaN(date.getTime())) throw new ValidationError(`${fieldName} debe ser una fecha válida (YYYY-MM-DD)`)
        return date
    }

    //Para validar el código postal
    static postalCode(value, fieldName) {
        const regex = /^\d{7}S/

        if (!regex.test(value)) throw new ValidationError(`${fieldName} debe ser un código postal de 7 digitos`)
        return value;
    }

    //Para validar valores Booleanos
    static isBoolean(value, fieldName) {
        if (typeof (value) !== 'boolean') throw new ValidationError(`${fieldName} debe ser un Booleano; verdadero o falso`)
        return value;

    }
}

