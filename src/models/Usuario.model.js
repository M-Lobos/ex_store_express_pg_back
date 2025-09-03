import { v4 as uuidv4 } from "uuid";
import { ValidationError, DataBaseError } from "../errors/TypesOfErrors.js";
import { Validation } from "../utils/validate/Validate.js";
import { createRecord, findActiveRecordById, findAllActiveRecords, findRecordByFilter } from "../utils/CRUD/crudUtils.js";


export class Usuario {
    constructor({ id, nombre, apellido_paterno, apellido_materno, email, telefono }) {
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.email = email;
        this.telefono = telefono;
        this.active = true;
    }

    static validate(data) {
        const errors = [];

        const { nombre, apellido_paterno, apellido_materno, email, telefono } = data;
        let nombreValido, apellido_paternoValido, apellido_maternoValido, emailValido, telefonoValido;

        //validation nombre
        try {
            nombreValido = Validation.isNotEmpty(nombre, 'nombre');
            nombreValido = Validation.ValidateName(nombre, 'nombre')
        } catch (error) {
            errors.push(error.message);
        }

        //Validación apellido paterno
        try {
            apellido_paternoValido = Validation.isNotEmpty(apellido_paterno, 'apellido_paterno')
            apellido_paternoValido = Validation.ValidateName(apellido_paterno, 'apellido_paterno')
        } catch (error) {
            errors.push(error.message)
        }

        //Validación apellido materno
        try {
            apellido_maternoValido = Validation.isNotEmpty(apellido_materno, 'apellido_materno')
            apellido_maternoValido = Validation.ValidateName(apellido_materno, 'apellido_materno')
        } catch (error) {
            errors.push(error.message)
        }

        //Validación apellido email
        try {
            emailValido = Validation.isNotEmpty(email)
            emailValido = Validation.email(email)
        } catch (error) {
            errors.push(error.message)
        }

        //Validación apellido telefono
        try {
            telefonoValido = Validation.isNotEmpty(telefono, 'telefono')
            telefonoValido = Validation.phone(telefono)
        } catch (error) {
            errors.push(error.message)
        }

        if (errors.length > 0) throw new ValidationError(`Error al validar usuario:`, errors);

        return {
            nombre: nombreValido,
            apellido_paterno: apellido_paternoValido,
            apellido_materno: apellido_maternoValido,
            email: emailValido,
            telefono: telefonoValido,
        }
    }

    static async create(data) {
        try {
            /*   Usuario.validate(data); */
            const id = uuidv4();
            const active = true;
            const user = { id, ...data, active }

            const userRecorded = await createRecord('usuarios', user);
            return userRecorded;

        } catch (error) {
            throw new DataBaseError('Error al registrar el usuario en la base datos', error)
        }
    }

    static async findAllActive() {
        try {
            const users = await findAllActiveRecords('usuarios');
            return users
        } catch (error) {
            throw new DataBaseError('Error al traer los registros de los usuarios en la base datos', error)
        }
    }

    static async findActiveByid(id) {
        try {
            const userByid = await findActiveRecordById('usuarios', id);
            return userByid
        } catch (error) {
            throw new DataBaseError(`Error al encontrar el resgirstro de ${id} en la base datos`, error)
        }
    }

    static async find(filters, condition) {
        try {
            const users = await findRecordByFilter('usuarios', filters, condition)
            return users

        } catch (error) {
            throw new DataBaseError(`Error al encontrar usuarios a través de los filtros:
                ${JSON.stringify(filters)}
                
                con condición:
                ${condition}
                `, error)
        }
    }

};