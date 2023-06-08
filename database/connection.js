import mysql from "mysql2";
import dotenv from "dotenv";

// Got it from ChatGPT as connection file can't read from .env file. So, we need to define the .env path explicitly
import path from "path";
dotenv.config({ path: "../.env" });

const db = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB_NAME,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});
export default db;
