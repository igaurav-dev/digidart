import { BrandMetrics, Competitor, KeywordVolume } from '../types';

/**
 * Simple hash function for deterministic randomization
 */
function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

/**
 * Generate keyword variations from brand name
 */
function generateKeywords(brandName: string): string[] {
    const base = brandName.toLowerCase().trim();
    const keywords = [
        base,
        `${base} brand`,
        `${base} online`,
        `${base} reviews`,
        `best ${base}`,
        `${base} products`,
        `${base} services`,
        `buy ${base}`,
    ];

    // Return 5-8 keywords based on hash
    const hash = simpleHash(brandName);
    const count = 5 + (hash % 4);
    return keywords.slice(0, count);
}

/**
 * Generate mock competitor data
 */
function generateCompetitors(brandName: string, hash: number): Competitor[] {
    const competitorNames = [
        'MarketLeader Corp',
        'IndustryGiant Ltd',
        'TopBrand Solutions',
        'PremiumChoice Inc',
        'EliteServices Group',
    ];

    const count = 3 + (hash % 3); // 3-5 competitors
    const competitors: Competitor[] = [];

    for (let i = 0; i < count; i++) {
        const seedHash = hash + i * 1000;
        competitors.push({
            name: competitorNames[i % competitorNames.length],
            score: 40 + (seedHash % 55), // 40-95
            marketShare: 10 + (seedHash % 30), // 10-40%
        });
    }

    return competitors.sort((a, b) => b.score - a.score);
}

/**
 * Distribute total volume across keywords
 */
function distributeVolumes(
    keywords: string[],
    totalVolume: number
): KeywordVolume[] {
    const volumes: KeywordVolume[] = [];
    let remaining = totalVolume;

    keywords.forEach((keyword, index) => {
        // Primary keyword gets more volume (30-40%)
        // Others get decreasing percentages
        const percentage =
            index === 0
                ? 0.35
                : index === 1
                    ? 0.25
                    : index === 2
                        ? 0.20
                        : 0.2 / (keywords.length - 3);

        const volume = Math.round(totalVolume * percentage);
        volumes.push({ keyword, volume });
        remaining -= volume;
    });

    // Add any remaining volume to the first keyword
    if (remaining > 0 && volumes.length > 0) {
        volumes[0].volume += remaining;
    }

    return volumes;
}

/**
 * Generate comprehensive brand metrics based on brand name
 * Uses deterministic hash for consistent results
 */
export function generateMetrics(brandName: string): BrandMetrics {
    const hash = simpleHash(brandName);

    // Search Score: 40-100, weighted toward higher scores
    const searchScore = 40 + (hash % 61);

    // Monthly Search Volume: 1,000 - 500,000
    const monthlySearchVolume = 1000 + (hash % 499000);

    // Competitor Level based on score
    const competitorLevel: 'Low' | 'Medium' | 'High' =
        searchScore > 75 ? 'High' : searchScore > 55 ? 'Medium' : 'Low';

    // Generate keywords
    const topKeywords = generateKeywords(brandName);

    // Generate competitors
    const competitorAnalysis = generateCompetitors(brandName, hash);

    // Distribute volumes
    const keywordVolumes = distributeVolumes(topKeywords, monthlySearchVolume);

    return {
        searchScore,
        topKeywords,
        monthlySearchVolume,
        competitorLevel,
        competitorAnalysis,
        keywordVolumes,
    };
}
