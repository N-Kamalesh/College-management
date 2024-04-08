import pg from "pg";
import "dotenv/config";
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, DB_PORT } = process.env;

const db = new pg.Client({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: true,
});

db.connect();

export default db;
