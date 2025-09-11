import { Usuario } from "../models/Usuario.model.js"
import { VALID_USER_FIELDS } from "../utils/constants/validateFields.js"
import { Validation } from "../utils/validate/Validate.js"

export const createUser = async (req, res, next) => {
    try {
        const user = await Usuario.createRecord(req.body)

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

        const userValidated = Validation.responseIsEmpty(users)

        res.status(200).json({
            message: 'Registros de usuarios activos encontrados',
            status: 200,
            data: userValidated
        })
    } catch (error) {
        next(error)
    }
}

export const findUserActiveById = async (req, res, next) => {
    try {
        const { id } = req.params

        const user = await Usuario.findActiveByid(id);
        const userValidated = Validation.responseIsEmpty(user);

        res.status(200).json({
            message: `Usuario de id ${id} encontrado con éxito.`,
            status: 200,
            data: userValidated
        })
    } catch (error) {
        next(error)
    }
}

export const findUserByFilters = async (req, res, next) => {
    try {
        const filters = req.query;
        const { condition } = req.body

        Validation.isValidFilter(filters, VALID_USER_FIELDS)

        const users = await Usuario.find(filters, condition)
        const userValidated = Validation.responseIsEmpty(users)

        res.status(200).json({
            message: `Usuarios encontrados con éxito.`,
            status: 200,
            data: userValidated
        });
    } catch (error) {
        next(error)
    }



}

export const updateUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedUser = await Usuario.updateUserRecord(id, data);

        res.status(201).json({
            message: `Usuario actualizado con éxito`,
            status: 201,
            data: updatedUser
        })
    } catch (error) {
        next(error)
    }
}

export const permaDeleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const userDeleted = await Usuario.permaDelete(id);

        res.status(200).json({
            message: `Usuario eliminado permanentemente con éxito`,
            status: 200,
            dataDeleted: userDeleted
        });

    } catch (error) {
        next(error)
    }
}


export const softDeleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userDeleted = await Usuario.softDelete(id)

        res.status(200).json({
            message: `Usuario eliminado con éxito`,
            status: 200,
            dataDeleted: userDeleted
        });

    } catch (error) {
        next(error)
    }
}

