import type { Metadata } from 'next';
import ThemeToggle from '../components/ThemeToggle';
import './globals.css';

export const metadata: Metadata = {
    title: 'Brand Visibility Analyzer',
    description: 'Analyze your brand visibility with comprehensive metrics and insights',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeToggle />
                {children}
            </body>
        </html>
    );
}
