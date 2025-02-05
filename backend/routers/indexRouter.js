import express from 'express';
import blogPostRouter from './postRouter.js';
import authRouter from './authRouter.js';
import commentRouter from './commentRouter.js';

const indexRouter = express.Router({ mergeParams: true });

indexRouter.get('/', (req, res) => {
    return res.status(200).json({ message: 'this works' });
});

indexRouter.use('/auth', authRouter);
indexRouter.use('/post', blogPostRouter);
indexRouter.use('/posts/:postId/comments', commentRouter);

export default indexRouter;
