import express from 'express';
import { createBlogPostValidation } from '../middlewares/validationMiddleware.js';
import {
    createBlogPost,
    deleteBlogPost,
    getAllBlogPosts,
    getBlogPostById,
    updateBlogPost,
} from '../controllers/postController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const blogPostRouter = express.Router();

//    - *Create Post:* POST /api/posts
blogPostRouter.post(
    '/',
    authenticateUser,
    createBlogPostValidation,
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
blogPostRouter.post('/:id', authenticateUser, updateBlogPost);

//    - *Delete Post:* DELETE /api/posts/:id
blogPostRouter.delete('/:id', deleteBlogPost);

export default blogPostRouter;
