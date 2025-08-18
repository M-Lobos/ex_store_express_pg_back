import { query } from "../../config/db.config.js";
import { DataBaseError } from "../../errors/TypesOfErrors.js";

export const connectDB = async () => {
    try {
        const { rows } = await query(`SELECT NOW()`)
        return rows[0];
    } catch (error) {
        throw new DataBaseError(`No nos pudimos conectar a la DB`, error)
    }
}