import {config} from 'dotenv';

config({ path: './config/.env.development.local' });

export const { PORT, DB_URI, JWT_SECRET, JWT_EXPIRY } = process.env; // Destructure the PORT variable from the environment variables