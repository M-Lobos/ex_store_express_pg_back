import { query } from "../../config/db.config.js";

export const connectDB = async () => {
    try {
        const { rows } = await query(`SELECT NOW()`)
        return rows[0];
    } catch (error) {
        console.error(`No nos pudimos conectar a la DB ${error}`)
    }
}