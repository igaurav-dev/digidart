import * as fs from 'fs';
import * as path from 'path';
import { Submission } from '../types';

const DATA_DIR = path.join(__dirname, '../../data');
const STORAGE_FILE = path.join(DATA_DIR, 'submissions.json');

/**
 * Ensure data directory and storage file exist
 */
function initializeStorage(): void {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORAGE_FILE)) {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify([], null, 2));
    }
}

/**
 * Read all submissions from storage
 */
function readSubmissions(): Submission[] {
    try {
        initializeStorage();
        const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading submissions:', error);
        return [];
    }
}

/**
 * Write submissions to storage
 */
function writeSubmissions(submissions: Submission[]): void {
    try {
        initializeStorage();
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(submissions, null, 2));
    } catch (error) {
        console.error('Error writing submissions:', error);
        throw new Error('Failed to save submission');
    }
}

/**
 * Save a new submission
 */
export function saveSubmission(submission: Submission): Submission {
    const submissions = readSubmissions();
    submissions.push(submission);
    writeSubmissions(submissions);
    return submission;
}

/**
 * Get a submission by ID
 */
export function getSubmissionById(id: string): Submission | null {
    const submissions = readSubmissions();
    return submissions.find(sub => sub.id === id) || null;
}

/**
 * Get all submissions (for admin purposes)
 */
export function getAllSubmissions(): Submission[] {
    return readSubmissions();
}
