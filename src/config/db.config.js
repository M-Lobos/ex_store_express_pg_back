import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

/**
 * query function -  excetutes, text defined as the query in the DB lang, and paramas as the data asociated to the query
 * @param {string} text - String format structure, tells the structure of the query to the DB.
 * @param {array<any>} paramas - An array of data to be implemented in to dhe queryto to the DB
 * @returns 
 */

export const query = (text, params) => pool.query(text, params);