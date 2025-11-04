import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'what-to-eat-ai',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test the connection
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

// Helper function to test PostGIS extension
export const testPostGIS = async () => {
    try {
        const result = await pool.query('SELECT PostGIS_version();');
        console.log('✅ PostGIS is enabled:', result.rows[0].postgis_version);
        return true;
    } catch (error) {
        console.error('❌ PostGIS is not enabled:', error.message);
        console.error('Please run: CREATE EXTENSION IF NOT EXISTS postgis;');
        return false;
    }
};

export default pool;

