import { BrandMetrics } from '../types';
import Card from './ui/Card';
import styles from './MetricsDashboard.module.css';

interface MetricsDashboardProps {
    metrics: BrandMetrics;
}

export default function MetricsDashboard({ metrics }: MetricsDashboardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 75) return styles.scoreHigh;
        if (score >= 55) return styles.scoreMedium;
        return styles.scoreLow;
    };

    const getCompetitorBadge = (level: string) => {
        const badgeClass =
            level === 'High'
                ? styles.badgeHigh
                : level === 'Medium'
                    ? styles.badgeMedium
                    : styles.badgeLow;
        return <span className={`${styles.badge} ${badgeClass}`}>{level}</span>;
    };

    return (
        <div className={styles.dashboard}>
            <h2 className={styles.title}>Brand Visibility Metrics</h2>

            <div className={styles.metricsGrid}>
                <Card className={styles.metricCard}>
                    <div className={styles.metricLabel}>Search Score</div>
                    <div className={`${styles.metricValue} ${getScoreColor(metrics.searchScore)}`}>
                        {metrics.searchScore}/100
                    </div>
                    <div className={styles.progressBar}>
                        <div
                            className={`${styles.progressFill} ${getScoreColor(metrics.searchScore)}`}
                            style={{ width: `${metrics.searchScore}%` }}
                        />
                    </div>
                </Card>

                <Card className={styles.metricCard}>
                    <div className={styles.metricLabel}>Monthly Search Volume</div>
                    <div className={styles.metricValue}>
                        {metrics.monthlySearchVolume.toLocaleString()}
                    </div>
                    <div className={styles.metricSubtext}>searches/month</div>
                </Card>

                <Card className={styles.metricCard}>
                    <div className={styles.metricLabel}>Competitor Level</div>
                    <div className={styles.metricValue}>
                        {getCompetitorBadge(metrics.competitorLevel)}
                    </div>
                    <div className={styles.metricSubtext}>market competition</div>
                </Card>

                <Card className={styles.metricCard}>
                    <div className={styles.metricLabel}>Top Keywords</div>
                    <div className={styles.metricValue}>{metrics.topKeywords.length}</div>
                    <div className={styles.metricSubtext}>identified keywords</div>
                </Card>
            </div>

            <div className={styles.keywordsSection}>
                <h3>Top Keywords</h3>
                <div className={styles.keywordTags}>
                    {metrics.topKeywords.map((keyword, index) => (
                        <span key={index} className={styles.keywordTag}>
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
