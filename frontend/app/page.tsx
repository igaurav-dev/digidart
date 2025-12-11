import BrandForm from '../components/BrandForm';
import styles from './page.module.css';

export default function Home() {
    return (
        <main className={styles.main}>
            <div className="container">
                <div className={styles.header}>
                    <h1 className={`${styles.title} fade-in`}>
                        Brand Visibility Analyzer
                    </h1>
                    <p className={styles.description}>
                        Discover how visible your brand is online with our comprehensive analytics tool.
                        Get instant insights into search performance, competitor analysis, and keyword rankings.
                    </p>
                </div>

                <div className={styles.formContainer}>
                    <BrandForm />
                </div>

                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>📊</div>
                        <h3>Search Score Analysis</h3>
                        <p>Comprehensive scoring of your brand&apos;s online visibility</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>🔍</div>
                        <h3>Keyword Insights</h3>
                        <p>Discover top keywords driving traffic to your brand</p>
                    </div>
                    <div className={styles.feature}>
                        <div className={styles.featureIcon}>🏆</div>
                        <h3>Competitor Analysis</h3>
                        <p>See how you stack up against market competitors</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
