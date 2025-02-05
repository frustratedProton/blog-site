import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// validate and POST comments
export const createComments = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.status = 400;
        error.errors = errors.array();
        return next(error);
    }

    const { content, postId, email, username } = req.body;
    const userId = req.user.id;

    const comment = await prisma.comment.create({
        data: {
            content,
            postId,
            email,
            username: username || 'Anonymous',
            userId,
        },
    });

    res.status(201).json({ message: 'Comment created successfully', comment });
});

// GET all comments
export const getAllComments = asyncHandler(async (req, res, next) => {
    const comments = await prisma.comment.findMany({
        include: {
            post: true,
            user: true,
        },
    });

    res.status(200).json(comments);
});

// GET comment by id
export const getCommentById = asyncHandler(async (req, res, next) => {
    const { commentId } = req.params;

    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
        include: {
            post: true,
            user: true,
        },
    });

    if (!comment) {
        const error = new Error('Comment not found');
        error.status = 404;
        return next(error);
    }

    res.status(200).json(comment);
});

// update comment
export const updateComment = asyncHandler(async (req, res, next) => {
    const { commentId } = parseInt(req.params);
    const { content, email, username } = req.body;
    const userId = req.user.id;

    const existingComment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
    });

    if (!existingComment) {
        const error = new Error('Comment not found');
        error.status = 404;
        return next(error);
    }

    const updatedComment = await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            content,
            email,
            username,
            userId,
        },
    });

    res.status(200).json({
        message: 'Comment updated successfully',
        updatedComment,
    });
});

// delete comment by id
export const deleteComment = asyncHandler(async (req, res, next) => {
    const { commentId } = parseInt(req.params);

    const existingComment = await prisma.comment.findUnique({
        where: {
            id: commentId,
        },
    });

    if (!existingComment) {
        const error = new Error('Comment not found');
        error.status = 404;
        return next(error);
    }

    await prisma.comment.delete({
        where: {
            id: commentId,
        },
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
});
