
import express, { Express, Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import type { CorsOptions } from 'cors';
import authRoutes from './routes/authRoutes';
// import productRoutes from './routes/productRoutes'; // Example for future
// import storeRoutes from './routes/storeRoutes'; // Example for future
// import orderRoutes from './routes/orderRoutes'; // Example for future
// import aiRoutes from './routes/aiRoutes'; // Example for future

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const corsOptions: CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions) as RequestHandler); // Cast to RequestHandler

// Middleware for parsing JSON request bodies
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/stores', storeRoutes); 
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);
// app.use('/api/ai', aiRoutes);


// Simple root route
app.get('/', (req: Request, res: Response) => {
  (res as any).send('AI Product Page Generator Backend is running!');
});

// Basic Not Found Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  (res as any).status(404).json({ message: 'Resource not found' });
});

// Basic Error Handler Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error:", err.stack || err.message);
  const statusCode = ((res as any).statusCode && (res as any).statusCode !== 200) ? (res as any).statusCode : 500;
  (res as any).status(statusCode).json({
    message: err.message || 'An unexpected error occurred',
    // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`CORS enabled for origin: ${corsOptions.origin as string}`);
  if (!process.env.DATABASE_URL) {
    console.warn('WARNING: DATABASE_URL is not set in .env file.');
  }
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET is not set in .env file. Authentication will not work correctly.');
  }
});