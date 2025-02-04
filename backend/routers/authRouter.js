import express from 'express';
import { userValidation } from '../middlewares/validationMiddleware.js';
import { loginUser, registerUser } from '../controllers/authController.js';

const authRouter = express.Router();

// POST /auth/register - User registration
authRouter.post('/register', userValidation, registerUser);

// POST /auth/login - User login
authRouter.post('/login', loginUser);

export default authRouter;
