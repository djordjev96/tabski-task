"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Something went wrong";
    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
    });
};
exports.errorMiddleware = errorMiddleware;
