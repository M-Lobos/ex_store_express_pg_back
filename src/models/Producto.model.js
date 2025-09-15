import { v4 as uuidv4 } from "uuid";
import { ValidationError, DataBaseError } from "../errors/TypesOfErrors.js";
import { Validation } from "../utils/validate/Validate.js";
import {
    createRecord,
    findAllActiveRecords,
} from "../utils/CRUD/index.js";

export class Productos {
    constructor({ id, nombre, descripcion, price, stock }) {
        this.id = id,
            this.nombre = nombre
        this.descripcion = descripcion,
            this.price = price
        this.stock = stock,
            this.active = true
    }

    static validate(data) {
        const errors = []

        const { nombre, descripcion, price, stock } = data;
        let nombreValido, descripcionValida, priceValido, stockValido;

        //validación nombre
        try {
            nombreValido = Validation.isNotEmpty(nombre, 'nombre');
            nombreValido = Validation.isString(nombre, 'nombre')
        } catch (error) {
            errors.push(error.message)
        }

        //validación descripción
        try {
            descripcionValida = Validation.isNotEmpty(descripcion, 'descripcion');
            descripcionValida = Validation.isString(descripcion, 'descripcion');
        } catch (error) {
            errors.push(error.message)
        }

        //validación precio
        try {
            priceValido = Validation.isNumber(price, 'price')
            priceValido = Validation.isPositiveInteger(price, 'price');

        } catch (error) {
            errors.push(error.message)
        }

        //validación stock
        try {
            stockValido = Validation.isNumber(stock, 'stock');

        } catch (error) {
            errors.push(error.message)
        }

        //devuelve errores si hay
        if (errors.length > 0) throw new ValidationError(`Error al Error al validar el producto:`, errors);
        //retorna arreglo de valores validados
        return {
            nombre: nombreValido,
            descripcion: descripcionValida,
            price: priceValido,
            stock: stockValido
        }
    }

    //MÉTODOS CRUD
    static async create(data) {
        try {
            const id = uuidv4();
            const active = true;

            const product = { id, ...data, active }

            const productRecorded = await createRecord('productos', product);
            return productRecorded
        } catch (error) {
            throw new DataBaseError(`Error al registrar el producto en la base de datos`, error)
        }
    }

    static async findAllActiveProducts(){
        try {
            const products = await findAllActiveRecords("productos");

            return products
        } catch (error) {
            throw new DataBaseError(`Error al obtener todos los productos`, error)
        }
    }

}