import { SubmitRequest, SubmitResponse } from '../types';

const API_BASE_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

/**
 * Submit brand details to the API
 */
export async function submitBrand(
    data: SubmitRequest
): Promise<SubmitResponse> {
    const response = await fetch(`${API_BASE_URL}/api/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit brand');
    }

    return response.json();
}

/**
 * Get submission by ID
 */
export async function getSubmission(id: string): Promise<SubmitResponse> {
    const response = await fetch(`${API_BASE_URL}/api/submission/${id}`);

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to get submission');
    }

    return response.json();
}
