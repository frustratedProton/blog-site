import express from 'express';
import {
    createComments,
    deleteComment,
    getCommentsForPost,
    getCommentById,
    updateComment,
} from '../controllers/commentController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { validateComment } from '../middlewares/validationMiddleware.js';

const commentRouter = express.Router({ mergeParams: true });

// Create a comment for a specific post
commentRouter.post('/', authenticateUser, validateComment, createComments);

// Get all comments for a specific post
commentRouter.get('/', getCommentsForPost);

// Get a specific comment by its ID for a specific post
commentRouter.get('/:commentId', getCommentById);

// Update a specific comment for a specific post
commentRouter.put(
    '/:commentId',
    authenticateUser,
    validateComment,
    updateComment
);

// Delete a specific comment for a specific post
commentRouter.delete('/:commentId', authenticateUser, deleteComment);

export default commentRouter;
