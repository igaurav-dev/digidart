import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { validateSubmission } from '../middleware/validation.middleware';
import { generateRealMetrics } from '../services/real-metrics.service';
import { saveSubmission, getSubmissionById } from '../services/storage.service';
import {
    SubmitRequest,
    SubmitResponse,
    GetSubmissionResponse,
    ErrorResponse,
    Submission,
} from '../types';

const router = Router();

/**
 * POST /api/submit
 * Submit brand details and receive visibility metrics
 */
router.post(
    '/submit',
    validateSubmission,
    async (req: Request, res: Response): Promise<void> => {
        try {
            const { brandName, brandWebsite, email } = req.body as SubmitRequest;

            // Generate unique ID
            const id = uuidv4();

            console.log(`📝 Processing submission for: ${brandName}`);

            // Generate real metrics (async)
            const metrics = await generateRealMetrics(brandName, brandWebsite);

            // Create submission object
            const submission: Submission = {
                id,
                brandName: brandName.trim(),
                brandWebsite: brandWebsite.trim(),
                email: email.trim().toLowerCase(),
                metrics,
                submittedAt: new Date().toISOString(),
            };

            // Save to storage
            saveSubmission(submission);

            console.log(`✅ Submission saved with ID: ${id}`);

            // Return response
            const response: SubmitResponse = submission;
            res.status(200).json(response);
        } catch (error) {
            console.error('Error in submit endpoint:', error);
            const errorResponse: ErrorResponse = {
                error: 'Internal server error',
                message: 'Failed to process submission',
            };
            res.status(500).json(errorResponse);
        }
    }
);

/**
 * GET /api/submission/:id
 * Retrieve a submission by ID
 */
router.get('/submission/:id', (req: Request, res: Response): void => {
    try {
        const { id } = req.params;

        // Get submission from storage
        const submission = getSubmissionById(id);

        if (!submission) {
            const errorResponse: ErrorResponse = {
                error: 'Submission not found',
                id,
            };
            res.status(404).json(errorResponse);
            return;
        }

        // Return response
        const response: GetSubmissionResponse = submission;
        res.status(200).json(response);
    } catch (error) {
        console.error('Error in get submission endpoint:', error);
        const errorResponse: ErrorResponse = {
            error: 'Internal server error',
            message: 'Failed to retrieve submission',
        };
        res.status(500).json(errorResponse);
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
router.get('/health', (req: Request, res: Response): void => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
    });
});

export default router;
