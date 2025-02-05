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

    const { content, email, username } = req.body;
    const postId = parseInt(req.params.postId);
    const userId = req.user.id;

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        return next(error);
    }

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

// GET all comments for a specific post
export const getCommentsForPost = asyncHandler(async (req, res, next) => {
    const postId = parseInt(req.params.postId);

    const post = await prisma.post.findUnique({
        where: { id: postId },
    });

    if (!post) {
        const error = new Error('Post not found');
        error.status = 404;
        return next(error);
    }

    const comments = await prisma.comment.findMany({
        where: { postId },
    });

    res.status(200).json(comments);
});

// GET comment by id
export const getCommentById = asyncHandler(async (req, res, next) => {
    const commentId = parseInt(req.params.commentId);

    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId,
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
    const commentId = parseInt(req.params.commentId);
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
    const commentId = parseInt(req.params.commentId);

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
