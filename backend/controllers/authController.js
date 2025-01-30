import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
    const { email, username, password, role } = req.body;

    try {
        const existingUser = prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists. ' });
        }

        const hashedPswd = await bcrypt.hash(password, 10);

        const userRole = role || 'USER';

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPswd,
                role: userRole,
            },
        });

        const token = jwt.sign(
            {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h',
            }
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                role: newUser.role,
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error during registration',
            error,
        });
    }
};
