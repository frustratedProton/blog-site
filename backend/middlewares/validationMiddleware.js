import { body } from 'express-validator';

export const createBlogPostValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),

    body('content').trim().notEmpty().withMessage('Content is required'),
];

export const userValidation = [
    body('email').isEmail().withMessage('Please provide a valid email'),

    body('username').trim().notEmpty().withMessage('Username is required'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Passwrod must be atleast 6 character long'),
];

export const validateComment = [
    body('content').isString().notEmpty().withMessage('Content is required'),

    body('postId').notEmpty().withMessage('Post ID must be an integer'),

    body('email').isEmail().optional().withMessage('Invalid email format'),

    body('username')
        .optional()
        .isString()
        .withMessage('Username must be a string'),
];
