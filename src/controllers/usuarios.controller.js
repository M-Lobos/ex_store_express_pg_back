import { Usuario } from "../models/Usuario.model.js"


export const createUser = async (req, res) => {
    try {
        const user = await Usuario.create(req.body)

        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user
        })

    } catch (error) {
        console.log("entro en el catch del controlador")

        res.status(500).json({
            message: 'No pudimos crear el usuario, error desde controlador',
            status: 500,

        })
    }
}