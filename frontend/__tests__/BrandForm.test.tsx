import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BrandForm from '../components/BrandForm';
import { submitBrand } from '../utils/api';

// Mock the API module
jest.mock('../utils/api');
const mockSubmitBrand = submitBrand as jest.MockedFunction<typeof submitBrand>;

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('BrandForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders form fields correctly', () => {
        render(<BrandForm />);

        expect(screen.getByLabelText(/brand name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/brand website/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/contact email/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /analyze brand/i })).toBeInTheDocument();
    });

    it('shows validation errors for empty fields', async () => {
        render(<BrandForm />);

        const submitButton = screen.getByRole('button', { name: /analyze brand/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/brand name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/website.*required/i)).toBeInTheDocument();
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for invalid email', async () => {
        render(<BrandForm />);

        const emailInput = screen.getByLabelText(/contact email/i);
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        const submitButton = screen.getByRole('button', { name: /analyze brand/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/email must be a valid email address/i)).toBeInTheDocument();
        });
    });

    it('shows validation error for invalid URL', async () => {
        render(<BrandForm />);

        const websiteInput = screen.getByLabelText(/brand website/i);
        fireEvent.change(websiteInput, { target: { value: 'invalid-url' } });

        const submitButton = screen.getByRole('button', { name: /analyze brand/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/website must be a valid url/i)).toBeInTheDocument();
        });
    });

    it('submits form successfully with valid data', async () => {
        const mockResponse = {
            id: 'test-id-123',
            brandName: 'Test Brand',
            brandWebsite: 'https://test.com',
            email: 'test@example.com',
            metrics: {
                searchScore: 75,
                topKeywords: ['test'],
                monthlySearchVolume: 10000,
                competitorLevel: 'Medium' as const,
                competitorAnalysis: [],
                keywordVolumes: [],
            },
            submittedAt: new Date().toISOString(),
        };

        mockSubmitBrand.mockResolvedValue(mockResponse);

        render(<BrandForm />);

        fireEvent.change(screen.getByLabelText(/brand name/i), {
            target: { value: 'Test Brand' },
        });
        fireEvent.change(screen.getByLabelText(/brand website/i), {
            target: { value: 'https://test.com' },
        });
        fireEvent.change(screen.getByLabelText(/contact email/i), {
            target: { value: 'test@example.com' },
        });

        const submitButton = screen.getByRole('button', { name: /analyze brand/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockSubmitBrand).toHaveBeenCalledWith({
                brandName: 'Test Brand',
                brandWebsite: 'https://test.com',
                email: 'test@example.com',
            });
            expect(mockPush).toHaveBeenCalledWith('/results/test-id-123');
        });
    });
});
