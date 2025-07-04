import pg from "pg";

const db = new pg.Client({
  // user: process.env.DB_USER,
  user: 'postgres',
  host: 'localhost',
  database: 'BookVault',
  password: 'ShreyaPSQL',
  port: 5432,

});

db.connect();
export default db;