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
    });

    res.status(200).json(allAuthorPost);
});
