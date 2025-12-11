/**
 * Type definitions shared between frontend and backend
 */

export interface SubmitRequest {
    brandName: string;
    brandWebsite: string;
    email: string;
}

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

export interface SubmitResponse {
    id: string;
    brandName: string;
    brandWebsite: string;
    email: string;
    metrics: BrandMetrics;
    submittedAt: string;
}

export interface ValidationError {
    error: string;
    details: Record<string, string>;
}
