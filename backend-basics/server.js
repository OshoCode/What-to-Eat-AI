import express from 'express';  // Import Express
const app = express();  // Create an Express app

import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'

import {PORT} from './config/env.js';  // Import configuration
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middleware/error.middleware.js';

import authRouter from './routes/auth.routes.js';  // Import authentication routes
import userRouter from './routes/user.routes.js';  // Import user routes
import subscriptionRouter from './routes/subscription.routes.js';  // Import subscription routes

app.use(helmet())           // Secure HTTP headers
app.use(cors())             // Allow cross-origin
app.use(rateLimit({         // Prevent abuse
  windowMs: 15 * 60 * 1000,
  max: 100
}))

app.use(express.json()); // Parses JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parses URL-encoded request bodies
app.use(express.static('public')); // Serve static files from the "public" directory


app.use('/api/auth', authRouter);  // Use authentication routes
app.use('/api/users', userRouter);  // Use user routes
app.use('/api/subscription', subscriptionRouter);  // Use subscription routes

app.use(errorMiddleware); // Use error handling middleware

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello, My Backend World! 🚀');
});


// Start the Server
app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    await connectToDatabase();  // Connect to the database
    console.log('Database connection established!');
});

