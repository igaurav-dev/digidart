/**
 * Type definitions for Brand Visibility Analyzer API
 */

// Request DTOs
export interface SubmitRequest {
    brandName: string;
    brandWebsite: string;
    email: string;
}

// Response DTOs
export interface SubmitResponse {
    id: string;
    brandName: string;
    brandWebsite: string;
    email: string;
    metrics: BrandMetrics;
    submittedAt: string;
}

export interface GetSubmissionResponse extends SubmitResponse { }

// Metrics Types
export interface BrandMetrics {
    searchScore: number;
    topKeywords: string[];
    monthlySearchVolume: number;
    competitorLevel: 'Low' | 'Medium' | 'High';
    competitorAnalysis: Competitor[];
    keywordVolumes: KeywordVolume[];
}

export interface Competitor {
    name: string;
    score: number;
    marketShare: number;
}

export interface KeywordVolume {
    keyword: string;
    volume: number;
}

// Storage Types
export interface Submission {
    id: string;
    brandName: string;
    brandWebsite: string;
    email: string;
    metrics: BrandMetrics;
    submittedAt: string;
}

// Error Types
export interface ValidationError {
    error: string;
    details: Record<string, string>;
}

export interface ErrorResponse {
    error: string;
    message?: string;
    id?: string;
}
