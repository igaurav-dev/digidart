import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '../types';

/**
 * Global error handling middleware
 */
export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error('Error:', err);

    const response: ErrorResponse = {
        error: 'Internal server error',
        message: err.message || 'An unexpected error occurred',
    };

    res.status(500).json(response);
}

/**
 * 404 Not Found handler
 */
export function notFoundHandler(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const response: ErrorResponse = {
        error: 'Not Found',
        message: `Route ${req.method} ${req.path} not found`,
    };

    res.status(404).json(response);
}
