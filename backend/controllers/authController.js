import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import { validationResult } from 'express-validator';

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
    const error = new Error('JWT_SECRET is not defined');
    error.status = 400;
    next(error);
}

export const registerUser = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed');
        error.status = 400;
        error.errors = errors.array();
        return next(error);
    }

    const { email, username, password } = req.body;

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        const error = new Error('User already exists');
        error.status = 400;
        return next(error);
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPwd,
        },
    });

    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({ user: userWithoutPassword });
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        const error = new Error('Invalid credentials');
        error.status = 400;
        return next(error);
    }

    const isPwdCorrect = await bcrypt.compare(password, user.password);
    if (!isPwdCorrect) {
        const error = new Error('Invalid credentials');
        error.status = 400;
        return next(error);
    }

    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
        },
        jwtSecret,
        {
            expiresIn: '1h',
        }
    );

    res.status(200).json({ token, userId: user.id });
});
