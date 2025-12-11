import * as fs from 'fs';
import * as path from 'path';
import {
    saveSubmission,
    getSubmissionById,
    getAllSubmissions,
} from '../services/storage.service';
import { Submission } from '../types';

// Mock submission for testing
const mockSubmission: Submission = {
    id: 'test-id-123',
    brandName: 'Test Brand',
    brandWebsite: 'https://testbrand.com',
    email: 'test@example.com',
    metrics: {
        searchScore: 75,
        topKeywords: ['test', 'brand'],
        monthlySearchVolume: 10000,
        competitorLevel: 'Medium',
        competitorAnalysis: [],
        keywordVolumes: [],
    },
    submittedAt: new Date().toISOString(),
};

const TEST_DATA_DIR = path.join(__dirname, '../../data-test');
const TEST_STORAGE_FILE = path.join(TEST_DATA_DIR, 'submissions.json');

describe('Storage Service', () => {
    beforeEach(() => {
        // Clean up test directory before each test
        if (fs.existsSync(TEST_DATA_DIR)) {
            fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
        }
    });

    afterEach(() => {
        // Clean up test directory after each test
        if (fs.existsSync(TEST_DATA_DIR)) {
            fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
        }
    });

    describe('saveSubmission', () => {
        it('should save a submission successfully', () => {
            const result = saveSubmission(mockSubmission);
            expect(result).toEqual(mockSubmission);
        });

        it('should create data directory if it does not exist', () => {
            expect(fs.existsSync(TEST_DATA_DIR)).toBe(false);
            saveSubmission(mockSubmission);
            expect(fs.existsSync(TEST_DATA_DIR)).toBe(true);
        });
    });

    describe('getSubmissionById', () => {
        it('should return null for non-existent submission', () => {
            const result = getSubmissionById('non-existent-id');
            expect(result).toBeNull();
        });

        it('should retrieve saved submission by ID', () => {
            saveSubmission(mockSubmission);
            const result = getSubmissionById(mockSubmission.id);
            expect(result).toEqual(mockSubmission);
        });
    });

    describe('getAllSubmissions', () => {
        it('should return empty array when no submissions exist', () => {
            const result = getAllSubmissions();
            expect(result).toEqual([]);
        });

        it('should return all saved submissions', () => {
            const submission1 = { ...mockSubmission, id: 'id-1' };
            const submission2 = { ...mockSubmission, id: 'id-2' };

            saveSubmission(submission1);
            saveSubmission(submission2);

            const result = getAllSubmissions();
            expect(result).toHaveLength(2);
            expect(result).toContainEqual(submission1);
            expect(result).toContainEqual(submission2);
        });
    });
});
