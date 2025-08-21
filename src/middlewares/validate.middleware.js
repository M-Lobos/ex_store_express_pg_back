import { ValidationError } from "../errors/TypesOfErrors.js";

export const validationMiddleware = (validatorFn) => {
    return (req, res, next) => {
        try {
            validatorFn(req.body);
            next();

        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    error: 'Errores de validación',
                    details: error
                })
            }

            next(error);
        }
    }
}

