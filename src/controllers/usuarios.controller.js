import { Usuario } from "../models/Usuario.model.js"

export const createUser = async (req, res, next) => {
    try {
        const user = await Usuario.create(req.body)

        res.status(201).json({
            message: 'Usuario creado con éxito',
            status: 201,
            data: user
        })

    } catch (error) {
        next(error)
    }
}

export const findAllActiveUsers = async (req, res, next) => {
    try {
        const users = await Usuario.findAllActive()

        res.status(200).json({
            message: 'Registros de usuarios activos encontrados',
            status: 200,
            data: users
        })
    } catch (error) {
        next(error)
    }
}