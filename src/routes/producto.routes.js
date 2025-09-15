import { Router } from "express";

import { validationMiddleware } from "../middlewares/validate.middleware.js";
import { Productos } from "../models/Producto.model.js";
import { createProducts, findAllActiveProducts } from "../controllers/productos.controller.js";

const router = Router();

router.post('/productos', validationMiddleware(Productos.validate), createProducts);
router.get('/productos', findAllActiveProducts);

export default router;