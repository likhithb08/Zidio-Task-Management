const errorMiddleware = (err, req, res, next) => {
    try {
        let error = { ...err };

        error.message = err.message;
        console.log(err);

        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new Error(message, 404);
            console.log(error)
        }
        if (err.code === 11000) {
            const message = 'Resource already exists';
            error = new Error(message, 400);
        }
        if(err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new Error(message.join(' , '), 400);
        }
        res.status(error.statusCode || 500).json({ success : false , message: error.message || 'Internal server error' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
        next(error);
    }
}

export default errorMiddleware;