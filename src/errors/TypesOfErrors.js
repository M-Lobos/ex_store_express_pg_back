import { CustomError } from "./CustomErrors.js";

export class ValidationError extends CustomError {
    constructor(message, details) {
        super(message || 'Error de Validación', 400, details)
    }
}

export class DataBaseError extends CustomError {
    constructor(message, details) {
        super(message || 'Error en la comunicación con la DB', 500, details)
    }
}

export class NotFoundError extends CustomError {
    constructor(message, entity, details) {
        super(message || `${entity} No encontrado`, 404, details)
    }
}

export class MailError extends CustomError {
    constructor(message, details) {
        super(message || 'Error al enviar el email', 500, details)
    }
}

export class InternalServerError extends CustomError {
    constructor(message, details) {
        super(message || 'Error interno del servidor', 500, details)
    }
}

