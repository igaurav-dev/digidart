import express, { Express } from 'express';
import cors from 'cors';
import submissionRoutes from './routes/submission.routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

// Load environment variables
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

/**
 * Initialize Express application
 */
const app: Express = express();

/**
 * Middleware
 */
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */
app.use('/api', submissionRoutes);

/**
 * Error handling
 */
app.use(notFoundHandler);
app.use(errorHandler);

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 API available at http://localhost:${PORT}/api`);
    console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
});

export default app;
