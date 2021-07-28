const ErrorResponse = require("../util/error-response");

const errorHandler = (error, req, res, next) => {
    // Log the error for dev
    console.log(error);

    let err = { ...error };
    err.message = error.message;

    // Mongoose bad ObjectId
    if (error.name === 'CastError') {
        const message = `Resource not found with id ${error.value}`
        err = new ErrorResponse(message, 404);
    }

    // Handle Mongoose Duplicate Error
    if (error.code === 11000) {
        const message = 'Duplicate field value entered';
        err = new ErrorResponse(message, 400)
    }

    // Handle Mongoose Validation Error
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.message);
        err = new ErrorResponse(message, 400)
    }

    res.status(error.statusCode || 500).json({ success: false, error: err.message });
}

module.exports = errorHandler;