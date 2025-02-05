import express from 'express';
import blogPostRouter from './postRouter.js';
import authRouter from './authRouter.js';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => {
    return res.status(200).json({ message: 'this works' });
});

indexRouter.use('/auth', authRouter);
indexRouter.use('/post', blogPostRouter);

export default indexRouter;
