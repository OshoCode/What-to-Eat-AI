import {config} from 'dotenv';

config({ path: './config/.env.development.local' });

export const { PROJECT_URL, API_KEY } = process.env; // Destructure the PORT variable from the environment variables