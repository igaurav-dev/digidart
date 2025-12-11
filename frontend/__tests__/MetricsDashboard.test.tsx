import { render, screen } from '@testing-library/react';
import MetricsDashboard from '../components/MetricsDashboard';
import { BrandMetrics } from '../types';

const mockMetrics: BrandMetrics = {
    searchScore: 85,
    topKeywords: ['brand', 'product', 'service'],
    monthlySearchVolume: 50000,
    competitorLevel: 'High',
    competitorAnalysis: [
        { name: 'Competitor A', score: 90, marketShare: 30 },
        { name: 'Competitor B', score: 75, marketShare: 20 },
    ],
    keywordVolumes: [
        { keyword: 'brand', volume: 20000 },
        { keyword: 'product', volume: 18000 },
        { keyword: 'service', volume: 12000 },
    ],
};

describe('MetricsDashboard', () => {
    it('renders metrics correctly', () => {
        render(<MetricsDashboard metrics={mockMetrics} />);

        expect(screen.getByText('Brand Visibility Metrics')).toBeInTheDocument();
        expect(screen.getByText('85/100')).toBeInTheDocument();
        expect(screen.getByText('50,000')).toBeInTheDocument();
        expect(screen.getByText('High')).toBeInTheDocument();
        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('displays all top keywords', () => {
        render(<MetricsDashboard metrics={mockMetrics} />);

        expect(screen.getByText('brand')).toBeInTheDocument();
        expect(screen.getByText('product')).toBeInTheDocument();
        expect(screen.getByText('service')).toBeInTheDocument();
    });

    it('applies correct color for high search score', () => {
        render(<MetricsDashboard metrics={mockMetrics} />);

        const scoreElement = screen.getByText('85/100');
        expect(scoreElement).toHaveClass('scoreHigh');
    });

    it('applies correct color for medium search score', () => {
        const mediumMetrics = { ...mockMetrics, searchScore: 65 };
        render(<MetricsDashboard metrics={mediumMetrics} />);

        const scoreElement = screen.getByText('65/100');
        expect(scoreElement).toHaveClass('scoreMedium');
    });

    it('applies correct color for low search score', () => {
        const lowMetrics = { ...mockMetrics, searchScore: 45 };
        render(<MetricsDashboard metrics={lowMetrics} />);

        const scoreElement = screen.getByText('45/100');
        expect(scoreElement).toHaveClass('scoreLow');
    });
});
