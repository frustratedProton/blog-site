import express from 'express';
import blogPostRouter from './postRouter.js';
import authRouter from './authRouter.js';

const indexRouter = express.Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/post', blogPostRouter);

export default indexRouter;
