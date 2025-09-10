import { Router } from "express";
import {
    createUser,
    findAllActiveUsers,
    findUserActiveById,
    findUserByFilters,
    permaDeleteUserById,
    updateUserById
} from "../controllers/usuarios.controller.js";
import { validationMiddleware } from "../middlewares/validate.middleware.js";
import { Usuario } from "../models/Usuario.model.js";

const router = Router();

router.post('/usuario', validationMiddleware(Usuario.validate), createUser);
router.get('/usuarios', findAllActiveUsers);
router.get('/usuario/id/:id', findUserActiveById);
router.get('/usuario/filters', findUserByFilters);
router.put('/usuario/update/:id', validationMiddleware(Usuario.validate), updateUserById);
router.delete('/usuario/admin/delete/permanent/:id', permaDeleteUserById);

export default router;



