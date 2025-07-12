// import pg from "pg";

// const db = new pg.Client({
//   // user: process.env.DB_USER,
//   user: 'postgres',
//   host: 'localhost',
//   database: 'BookVault',
//   password: '//',
//   port: 5432,

// });

// db.connect();
// export default db;



import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Client } = pg;

const db = new Client({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// db.connect();

db.connect()
  .then(() => console.log("✅ Connected to Neon PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));
  
export default db;
