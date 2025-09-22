import { Router } from "express";

import { validationMiddleware } from "../middlewares/validate.middleware.js";
import { Productos } from "../models/Producto.model.js";
import { createProducts, findActiveProductById, findAllActiveProducts, findProductsByFilters } from "../controllers/productos.controller.js";

const router = Router();

router.post('/productos', validationMiddleware(Productos.validate), createProducts);
router.get('/productos', findAllActiveProducts);
router.get('/productos/id/:id', findActiveProductById);
router.get('/productos/filters', findProductsByFilters);

export default router;

