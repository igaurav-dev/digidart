import { Request, Response, NextFunction } from 'express';
import { SubmitRequest, ValidationError } from '../types';

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * URL validation regex
 */
const URL_REGEX = /^https?:\/\/.+\..+/;

/**
 * Validate brand name
 */
function validateBrandName(brandName: string): string | null {
    if (!brandName || typeof brandName !== 'string') {
        return 'Brand name is required';
    }

    const trimmed = brandName.trim();
    if (trimmed.length < 2) {
        return 'Brand name must be at least 2 characters long';
    }

    if (trimmed.length > 100) {
        return 'Brand name must not exceed 100 characters';
    }

    return null;
}

/**
 * Validate website URL
 */
function validateWebsite(website: string): string | null {
    if (!website || typeof website !== 'string') {
        return 'Brand website is required';
    }

    if (!URL_REGEX.test(website.trim())) {
        return 'Brand website must be a valid URL (http:// or https://)';
    }

    return null;
}

/**
 * Validate email address
 */
function validateEmail(email: string): string | null {
    if (!email || typeof email !== 'string') {
        return 'Email is required';
    }

    if (!EMAIL_REGEX.test(email.trim())) {
        return 'Email must be a valid email address';
    }

    return null;
}

/**
 * Middleware to validate submission request body
 */
export function validateSubmission(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const { brandName, brandWebsite, email } = req.body as Partial<SubmitRequest>;

    const errors: Record<string, string> = {};

    // Validate each field
    const brandNameError = validateBrandName(brandName as string);
    if (brandNameError) {
        errors.brandName = brandNameError;
    }

    const websiteError = validateWebsite(brandWebsite as string);
    if (websiteError) {
        errors.brandWebsite = websiteError;
    }

    const emailError = validateEmail(email as string);
    if (emailError) {
        errors.email = emailError;
    }

    // If there are errors, return 400
    if (Object.keys(errors).length > 0) {
        const response: ValidationError = {
            error: 'Validation failed',
            details: errors,
        };
        res.status(400).json(response);
        return;
    }

    // Validation passed, continue
    next();
}
