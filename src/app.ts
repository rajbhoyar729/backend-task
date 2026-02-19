import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler, notFound } from './utils/errorHandler';

const app: Application = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Rate Limiting
import { apiLimiter } from './middleware/rateLimiter';
app.use('/api', apiLimiter);

// Swagger Docs
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger';
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes
// Routes
import stepRoutes from './modules/onboarding/onboarding.routes'; // Updated import
import journeyRoutes from './modules/journey/journey.routes';
import runRoutes from './modules/run/run.routes';
import contentRoutes from './modules/content/content.routes';

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount routes
app.use('/api', stepRoutes);
app.use('/api/journeys', journeyRoutes);
app.use('/api/runs', runRoutes);
app.use('/api/content', contentRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
