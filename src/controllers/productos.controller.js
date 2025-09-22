
import { Productos } from "../models/Producto.model.js"
import { VALID_PRODUCTS_FIELDS } from "../utils/constants/validateFields.js"
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

export const findActiveProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await Productos.findActiveById(id);
        const productValidated = Validation.responseIsEmpty(product);

        res.status(200).json({
            message: `Producto de ID_ ${id} encontrado con éxito.`,
            status: 200,
            data: productValidated
        })
    } catch (error) {
        next(error)
    }
}

export const findProductsByFilters = async (req, res, next) => {
    try {
        const filters = req.query;
        const { condition } = req.body;

        Validation.isValidFilter(filters, VALID_PRODUCTS_FIELDS)
        const products = await Productos.find(filters, condition)
        const productsValidated = Validation.responseIsEmpty(products)

        res.status(200).json({
            message: `Producto encontrados con éxito.`,
            status: 200,
            data: productsValidated
        });
    } catch (error) {
        next(error)
    }
}

