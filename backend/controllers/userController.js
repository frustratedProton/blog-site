import { validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    res.status(200).json({ user });
});

export const getUserPosts = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const posts = await prisma.post.findMany({
        where: { authorId: userId },
    });

    res.status(200).json(posts);
});

export const getUserComments = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const comments = await prisma.comment.findMany({
        where: { userId },
    });

    res.status(200).json(comments);
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.status = 400;
        error.errors = errors.array();
        return next(error);
    }

    const userId = req.user.id;
    const { username, email } = req.body;

    const user = await prisma.user.update({
        where: { id: userId },
        data: { username, email },
    });

    res.status(200).json({ message: 'Profile updated successfully', user });
});

export const deleteUserProfile = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;

    const user = await prisma.user.delete({
        where: { id: userId },
    });

    res.status(200).json({ message: 'Profile deleted successfully', user });
});

export const updateUserRole = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const { role } = req.body;
    console.log(role);
    if (role !== 'AUTHOR' && role !== 'USER') {
        return next(new Error('Invalid role assignment'));
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: { role },
    });

    res.status(200).json({ message: 'User role updated successfully', user });
});
