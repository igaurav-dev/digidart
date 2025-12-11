'use client';

import { KeywordVolume } from '../types';
import Card from './ui/Card';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import styles from './KeywordChart.module.css';

interface KeywordChartProps {
    keywordVolumes: KeywordVolume[];
}

const COLORS = [
    '#6366f1',
    '#8b5cf6',
    '#ec4899',
    '#f43f5e',
    '#f97316',
    '#eab308',
    '#84cc16',
    '#10b981',
];

export default function KeywordChart({ keywordVolumes }: KeywordChartProps) {
    if (keywordVolumes.length === 0) {
        return null;
    }

    return (
        <Card className={styles.chartCard}>
            <h3 className={styles.title}>Keyword Search Volume</h3>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={keywordVolumes}
                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                        <XAxis
                            dataKey="keyword"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                        />
                        <YAxis
                            label={{ value: 'Search Volume', angle: -90, position: 'insideLeft' }}
                            fontSize={12}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--color-bg-primary)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                            }}
                            formatter={(value: number) => value.toLocaleString()}
                        />
                        <Bar dataKey="volume" radius={[8, 8, 0, 0]}>
                            {keywordVolumes.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
