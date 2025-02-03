// prototype auth middleware
// todo: change it

import jwt from 'jsonwebtoken';

const jswtSecret = process.env.JWT_SECRET;

export const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res
            .status(401)
            .json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Assuming the JWT contains the user ID as 'id (it doesnt rn)
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
