const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err};
        error.message = err.message;
        console.error(err);

        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '), 400);
        }
        if (err.code === 11000) {
            const message = `Duplicate field value entered: ${err.keyValue.name}`;
            error = new Error(message, 400);
        }
        if (err.name === 'CastError') {
            const message = `Resource not found with id: ${err.value}`;
            error = new Error(message, 404);
        }
        if (err.name === 'JsonWebTokenError') {
            const message = 'Invalid token, please log in again';
            error = new Error(message, 401);
        }

        res.status(error.statusCode || 500).json({
            success: false,
            error: error.message || 'Server Error',
        });

    } catch (error) {
        next(error);
    }
};
export default errorMiddleware;