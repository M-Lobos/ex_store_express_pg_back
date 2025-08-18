import { ValidationError } from "../../errors/TypesOfErrors.js"


export class Validation {

    static isNotEmpty(value, fieldName) {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new ValidationError(`${fieldName} no puede ser una cadena de texto vacía.`, error);
        }
        return value
    }

}