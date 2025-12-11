import { Competitor } from '../types';
import Card from './ui/Card';
import styles from './CompetitorTable.module.css';

interface CompetitorTableProps {
    competitors: Competitor[];
}

export default function CompetitorTable({ competitors }: CompetitorTableProps) {
    if (competitors.length === 0) {
        return null;
    }

    return (
        <Card className={styles.tableCard}>
            <h3 className={styles.title}>Competitor Analysis</h3>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Competitor</th>
                            <th>Score</th>
                            <th>Market Share</th>
                            <th>Performance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {competitors.map((competitor, index) => (
                            <tr key={index}>
                                <td className={styles.rank}>#{index + 1}</td>
                                <td className={styles.competitorName}>{competitor.name}</td>
                                <td className={styles.score}>{competitor.score}</td>
                                <td className={styles.marketShare}>{competitor.marketShare}%</td>
                                <td>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${competitor.score}%` }}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
