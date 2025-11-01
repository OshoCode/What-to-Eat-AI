import {Router} from 'express';
import {signUp, logIn} from '../controllers/auth.controller.js';  // Import sign-up controller

const authRouter = Router();

authRouter.post('/log-in', logIn);
authRouter.post('/sign-up', signUp);
authRouter.post('/sign-out', (req, res) => res.send('Sign-out route'));

export default authRouter;