import express from 'express';

const authRouter = express.Router();

//    - *Create Post:* POST /api/posts
authRouter.post('/', createBlogPost);
//    - *Read All Posts:* GET /api/posts
authRouter.get('/', getAllBlogPosts);
//    - *Read Single Post:* GET /api/posts/:id
authRouter.get('/:id', getBlogPostById);
//    - *Update Post:* PUT /api/posts/:id
authRouter.post('/:id', updateBlogPost);
//    - *Delete Post:* DELETE /api/posts/:id
authRouter.delete('/:id', deleteBlogPost);

export default authRouter;
