import { Router } from "express";
import { createUser } from "../controllers/usuarios.controller.js";

const router = Router();

router.post('/usuario', createUser);

export default router;



