import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// validate and POST the blog post
export const createBlogPost = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.status = 400;
        error.errors = errors.array();
        return next(error);
    }

    const { title, content } = req.body;

    const authorId = req.user.id;

    const author = await prisma.user.findUnique({
        where: {
            id: authorId,
        },
    });

    if (!author) {
        const error = new Error('Author not found');
        error.status = 404;
        return next(error);
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId,
            status: 'DRAFT',
        },
    });

    res.status(201).json(post);
});

// GET all post
export const getAllBlogPosts = asyncHandler(async (req, res, next) => {
    const authorId = req.user.id;

    const allAuthorPost = await prisma.post.findMany({
        where: {
            authorId,
        },
        include: {
            author: {
                select: {
                    username: true,
                },
            },
        },
    });

    res.status(200).json(allAuthorPost);
});

// GET post by id
export const getBlogPostById = asyncHandler(async (req, res, next) => {
    const blogPostId = parseInt(req.params.id);

    const blogPost = await prisma.post.findUnique({
        where: {
            id: blogPostId,
        },
        include: {
            author: {
                select: {
                    username: true,
                },
            },
        },
    });

    if (!blogPost) {
        const error = new Error('Blog post not found');
        error.status = 404;
        return next(error);
    }

    res.status(200).json(blogPost);
});

// update blogpost by id
export const updateBlogPost = asyncHandler(async (req, res, next) => {
    const blogPostId = parseInt(req.params.id);
    const { title, content } = req.body;

    const blogPost = await prisma.post.findUnique({
        where: {
            id: blogPostId,
        },
        include: {
            author: true,
        },
    });

    if (!blogPost) {
        const error = new Error('Blog post not found');
        error.status = 404;
        return next(error);
    }

    // Check if the logged-in user is the author of the post
    if (blogPost.author.id !== req.user.id) {
        const error = new Error('You are not authorized to update this post');
        error.status = 403;
        return next(error);
    }

    if (blogPost.author.id !== req.user.id) {
        const error = new Error('You are not authorized to update this post');
        error.status = 403;
        return next(error);
    }

    // Update the post
    const updatedPost = await prisma.post.update({
        where: {
            id: blogPostId,
        },
        data: {
            title: title || blogPost.title, // Only update if a new value is provided
            content: content || blogPost.content,
        },
    });

    res.status(200).json(updatedPost);
});

// DELETE a blog post
export const deleteBlogPost = asyncHandler(async (req, res, next) => {
    const blogPostId = parseInt(req.params.id);

    const blogPost = await prisma.post.findUnique({
        where: {
            id: blogPostId,
        },
        include: {
            author: true,
        },
    });

    if (!blogPost) {
        const error = new Error('Blog post not found');
        error.status = 404;
        return next(error);
    }

    if (blogPost.author.id !== req.user.id) {
        const error = new Error('You are not authorized to delete this post');
        error.status = 403;
        return next(error);
    }

    await prisma.post.delete({
        where: {
            id: blogPostId,
        },
    });

    res.status(200).json({ message: 'Blog post deleted successfully' });
});

export const updatePostStatus = asyncHandler(async (req, res, next) => {
    const postId = parseInt(req.params.id);
    const { status } = req.body;

    if (status !== 'PUBLISHED') {
        return next(new Error('Invalid status update'));
    }

    const post = await prisma.post.update({
        where: { id: postId },
        data: { status },
    });

    res.status(200).json({ message: 'Post published successfully', post });
});
