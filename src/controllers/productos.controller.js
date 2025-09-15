
import { Productos } from "../models/Producto.model.js"
import { Validation } from "../utils/validate/Validate.js"

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

export const findAllActiveProducts = async (req, res, next) => {
    try {
        const products = await Productos.findAllActiveProducts();
        const productsValidated = Validation.responseIsEmpty(products)

        res.status(200).json({
            message: 'Productos encontrados con éxito',
            status: 200,
            data: productsValidated
        })
    } catch (error) {
        next(error)
    }
}

