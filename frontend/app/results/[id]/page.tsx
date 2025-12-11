'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getSubmission } from '../../../utils/api';
import { SubmitResponse } from '../../../types';
import MetricsDashboard from '../../../components/MetricsDashboard';
import CompetitorTable from '../../../components/CompetitorTable';
import KeywordChart from '../../../components/KeywordChart';
import LoadingSpinner from '../../../components/LoadingSpinner';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import styles from './page.module.css';

export default function ResultsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [data, setData] = useState<SubmitResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSubmission() {
            try {
                const submission = await getSubmission(id);
                setData(submission);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load results');
            } finally {
                setLoading(false);
            }
        }

        if (id) {
            fetchSubmission();
        }
    }, [id]);

    if (loading) {
        return (
            <main className={styles.main}>
                <div className="container">
                    <LoadingSpinner />
                </div>
            </main>
        );
    }

    if (error || !data) {
        return (
            <main className={styles.main}>
                <div className="container">
                    <Card>
                        <div className={styles.error}>
                            <h2>❌ Error</h2>
                            <p>{error || 'Submission not found'}</p>
                            <Button onClick={() => router.push('/')}>Back to Home</Button>
                        </div>
                    </Card>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className="container">
                <div className={styles.header}>
                    <Button variant="secondary" onClick={() => router.push('/')}>
                        ← Back to Home
                    </Button>
                    <h1 className={styles.title}>Brand Visibility Report</h1>
                    <p className={styles.subtitle}>
                        Analysis generated on {new Date(data.submittedAt).toLocaleDateString()}
                    </p>
                </div>

                <Card className={styles.brandInfoCard}>
                    <h2 className={styles.sectionTitle}>Brand Information</h2>
                    <div className={styles.brandInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Brand Name:</span>
                            <span className={styles.infoValue}>{data.brandName}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Website:</span>
                            <a
                                href={data.brandWebsite}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.infoLink}
                            >
                                {data.brandWebsite}
                            </a>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.infoLabel}>Contact:</span>
                            <span className={styles.infoValue}>{data.email}</span>
                        </div>
                    </div>
                </Card>

                <MetricsDashboard metrics={data.metrics} />

                <KeywordChart keywordVolumes={data.metrics.keywordVolumes} />

                <CompetitorTable competitors={data.metrics.competitorAnalysis} />

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        Want to analyze another brand?
                    </p>
                    <Button onClick={() => router.push('/')}>Analyze New Brand</Button>
                </div>
            </div>
        </main>
    );
}
