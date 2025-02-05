import express from 'express';
import {
    deleteUserProfile,
    getUserComments,
    getUserPosts,
    getUserProfile,
    updateUserProfile,
    updateUserRole,
} from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

userRouter.get('/profile', authenticateUser, getUserProfile);
userRouter.get('/posts', authenticateUser, getUserPosts);
userRouter.put('/profile', authenticateUser, updateUserProfile);
userRouter.put('/role', authenticateUser, updateUserRole);
userRouter.delete('/profile', authenticateUser, deleteUserProfile);
userRouter.get('/comments', authenticateUser, getUserComments);

export default userRouter;
