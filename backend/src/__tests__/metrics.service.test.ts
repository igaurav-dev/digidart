import { generateMetrics } from '../services/metrics.service';

describe('Metrics Service', () => {
    describe('generateMetrics', () => {
        it('should generate metrics with all required fields', () => {
            const brandName = 'TestBrand';
            const metrics = generateMetrics(brandName);

            expect(metrics).toHaveProperty('searchScore');
            expect(metrics).toHaveProperty('topKeywords');
            expect(metrics).toHaveProperty('monthlySearchVolume');
            expect(metrics).toHaveProperty('competitorLevel');
            expect(metrics).toHaveProperty('competitorAnalysis');
            expect(metrics).toHaveProperty('keywordVolumes');
        });

        it('should generate search score between 40 and 100', () => {
            const metrics = generateMetrics('TestBrand');
            expect(metrics.searchScore).toBeGreaterThanOrEqual(40);
            expect(metrics.searchScore).toBeLessThanOrEqual(100);
        });

        it('should generate monthly search volume between 1000 and 500000', () => {
            const metrics = generateMetrics('TestBrand');
            expect(metrics.monthlySearchVolume).toBeGreaterThanOrEqual(1000);
            expect(metrics.monthlySearchVolume).toBeLessThanOrEqual(500000);
        });

        it('should generate 5-8 top keywords', () => {
            const metrics = generateMetrics('TestBrand');
            expect(metrics.topKeywords.length).toBeGreaterThanOrEqual(5);
            expect(metrics.topKeywords.length).toBeLessThanOrEqual(8);
        });

        it('should generate deterministic results for same brand name', () => {
            const metrics1 = generateMetrics('TestBrand');
            const metrics2 = generateMetrics('TestBrand');

            expect(metrics1.searchScore).toBe(metrics2.searchScore);
            expect(metrics1.monthlySearchVolume).toBe(metrics2.monthlySearchVolume);
            expect(metrics1.competitorLevel).toBe(metrics2.competitorLevel);
        });

        it('should generate different results for different brand names', () => {
            const metrics1 = generateMetrics('BrandA');
            const metrics2 = generateMetrics('BrandB');

            // At least one of these should be different
            const isDifferent =
                metrics1.searchScore !== metrics2.searchScore ||
                metrics1.monthlySearchVolume !== metrics2.monthlySearchVolume;

            expect(isDifferent).toBe(true);
        });

        it('should generate competitor analysis with 3-5 competitors', () => {
            const metrics = generateMetrics('TestBrand');
            expect(metrics.competitorAnalysis.length).toBeGreaterThanOrEqual(3);
            expect(metrics.competitorAnalysis.length).toBeLessThanOrEqual(5);
        });

        it('should have keyword volumes matching keyword count', () => {
            const metrics = generateMetrics('TestBrand');
            expect(metrics.keywordVolumes.length).toBe(metrics.topKeywords.length);
        });

        it('should set competitor level based on search score', () => {
            // This test uses known brand names that produce specific scores
            const highScoreBrand = 'AAAAAAAAAAAAA'; // Should produce high score
            const lowScoreBrand = 'zzz'; // Should produce low score

            const highMetrics = generateMetrics(highScoreBrand);
            const lowMetrics = generateMetrics(lowScoreBrand);

            // Verify logic: score > 75 = High, > 55 = Medium, else Low
            if (highMetrics.searchScore > 75) {
                expect(highMetrics.competitorLevel).toBe('High');
            } else if (highMetrics.searchScore > 55) {
                expect(highMetrics.competitorLevel).toBe('Medium');
            } else {
                expect(highMetrics.competitorLevel).toBe('Low');
            }
        });
    });
});
