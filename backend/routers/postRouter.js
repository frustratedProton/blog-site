import express from 'express';
import { createBlogPostValidation } from '../middlewares/validationMiddleware.js';
import { createBlogPost, getAllBlogPosts } from '../controllers/postController.js';

const blogPostRouter = express.Router();

//    - *Create Post:* POST /api/posts
// blogPostRouter.post('/', createBlogPostValidation, createBlogPost);
//    - *Read All Posts:* GET /api/posts
// blogPostRouter.get('/', getAllBlogPosts);
//    - *Read Single Post:* GET /api/posts/:id
// blogPostRouter.get('/:id', getBlogPostById);
// //    - *Update Post:* PUT /api/posts/:id
// blogPostRouter.post('/:id', updateBlogPost);
// //    - *Delete Post:* DELETE /api/posts/:id
// blogPostRouter.delete('/:id', deleteBlogPost);

export default blogPostRouter;
