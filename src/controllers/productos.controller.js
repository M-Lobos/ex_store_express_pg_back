
import { Productos } from "../models/Producto.model.js"

export const createProducts = async (req, res, next) => {
    try {
        const productos = await Productos.create(req.body)

        res.status(201).json({
            message: 'Producto creado con éxito',
            status: 201,
            data: productos
        })

    } catch (error) {
        next(error)
    }
}