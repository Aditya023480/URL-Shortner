import {Pool} from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
  user: process.env.PGUSER || 'postgres',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'URLshortner',
  password: process.env.PGPASSWORD || 'postgres',
  port: Number(process.env.PGPORT || 5432), 
});

export default pool
