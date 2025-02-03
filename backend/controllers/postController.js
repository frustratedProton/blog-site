import { validationResult, body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// validate and POST the blog post
export const createBlogPost = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.status = 400;
        return next(error);
    }

    const { title, content } = req.body;

    const authorId = req.user.id;

    const authorName = prisma.user.findUnique({
        where: {
            id: authorId,
        },
    });

    if (!authorExists) {
        const error = new Error('Author not found');
        error.status = 404;
        return next(error);
    }

    const post = await prisma.post.create({
        data: {
            title,
            content,
            authorId,
            author: authorName,
            status: 'DRAFT',
        },
    });

    res.status(201).json(post);
});
