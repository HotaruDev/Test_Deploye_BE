import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import corsMiddleware from './middleware/corsMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'; // Import rute admin
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);

app.get('/', (req, res) => res.status(200).json({ status: 'success', message: 'Welcome to API Seraloka' }))

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes); // Daftarkan rute admin

// Swagger API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
