export const isAuthor = (req, res, next) => {
    if (req.user.role !== 'AUTHOR') {
        const error = new Error(
            'Forbidden: You do not have the necessary permissions'
        );
        error.status = 403;
        return next(error);
    }
    next();
};
