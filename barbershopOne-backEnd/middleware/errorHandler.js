function notFoundHandler(req, res) {
    res.status(404).json({message: "route not found"});
}

function errorHandler(err, req, res, next) {
    console.error(err);

    let statusCode = err.statusCode || err.status || 500;
    let message = "internal server error, please try again later";

    if (statusCode >= 400 && statusCode < 500) {
        message = "invalid request";
    }

    if (err.name === "ValidationError" || err.name === "CastError") {
        statusCode = 400;
        message = "invalid request data";
    } else if (err.code === 11000) {
        statusCode = 409;
        message = "resource already exists";
    } else if (statusCode === 404) {
        message = "route not found";
    }

    if (res.headersSent) return next(err);
    res.status(statusCode).json({message});
}

module.exports = {notFoundHandler, errorHandler};