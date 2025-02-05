import express from 'express';
import {
    createComments,
    deleteComment,
    getAllComments,
    getCommentById,
    updateComment,
} from '../controllers/commentController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { validateComment } from '../middlewares/validationMiddleware.js';

const commentRouter = express.Router();

commentRouter.post('/', authenticateUser, validateComment, createComments);
commentRouter.get('/', getAllComments);
commentRouter.get('/:id', getCommentById);
commentRouter.put('/:id', authenticateUser, validateComment, updateComment);
commentRouter.delete('/:id', authenticateUser, deleteComment);

export default commentRouter;
