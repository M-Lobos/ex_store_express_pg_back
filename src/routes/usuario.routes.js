import { Router } from "express";
import { createUser } from "../controllers/usuarios.controller.js";
import { validationMiddleware } from "../middlewares/validate.middleware.js";
import { Usuario } from "../models/Usuario.model.js";

const router = Router();

router.post('/usuario', validationMiddleware(Usuario.validate), createUser);

export default router;



