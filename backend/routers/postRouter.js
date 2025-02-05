import express from 'express';
import { createBlogPostValidation } from '../middlewares/validationMiddleware.js';
import {
    createBlogPost,
    deleteBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
    updatePostStatus,
} from '../controllers/postController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { isAuthor } from '../middlewares/isAuthorMiddleware.js';

const blogPostRouter = express.Router();

//    - *Create Post:* POST /api/posts
blogPostRouter.post(
    '/',
    authenticateUser,
    createBlogPostValidation,
    isAuthor,
    createBlogPost
);

//    - *Read All Posts:* GET /api/posts
blogPostRouter.get('/', authenticateUser, getAllBlogPosts);

//    - *Read Single Post:* GET /api/posts/:id
blogPostRouter.get(
    '/:id',
    authenticateUser,
    createBlogPostValidation,
    getBlogPostById
);
//    - *Update Post:* PUT /api/posts/:id
blogPostRouter.put('/:id', authenticateUser, isAuthor, updateBlogPost);

blogPostRouter.put('/status', authenticateUser, isAuthor, updatePostStatus);

//    - *Delete Post:* DELETE /api/posts/:id
blogPostRouter.delete('/:id', authenticateUser, isAuthor, deleteBlogPost);

export default blogPostRouter;
