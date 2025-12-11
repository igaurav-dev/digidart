/**
 * Email validation regex
 */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * URL validation regex
 */
export const URL_REGEX = /^https?:\/\/.+\..+/;

/**
 * Validate email address
 */
export function validateEmail(email: string): string | null {
    if (!email || email.trim().length === 0) {
        return 'Email is required';
    }

    if (!EMAIL_REGEX.test(email.trim())) {
        return 'Email must be a valid email address';
    }

    return null;
}

/**
 * Validate website URL
 */
export function validateWebsite(website: string): string | null {
    if (!website || website.trim().length === 0) {
        return 'Website URL is required';
    }

    if (!URL_REGEX.test(website.trim())) {
        return 'Website must be a valid URL (http:// or https://)';
    }

    return null;
}

/**
 * Validate brand name
 */
export function validateBrandName(brandName: string): string | null {
    if (!brandName || brandName.trim().length === 0) {
        return 'Brand name is required';
    }

    if (brandName.trim().length < 2) {
        return 'Brand name must be at least 2 characters long';
    }

    if (brandName.trim().length > 100) {
        return 'Brand name must not exceed 100 characters';
    }

    return null;
}
