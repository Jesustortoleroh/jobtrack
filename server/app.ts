import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { toNodeHandler } from "better-auth/node";

// Local Imports
import { auth } from "./auth.ts";
import routes from './routes/index.ts';
import EntityNotFoundError from './errors/EntityNotFoundError.ts';
import { globalErrorHandler } from './middleware/error.middleware.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app: express.Application = express();

// --- 1. BETTER AUTH HANDLER ---
// This must be mounted BEFORE express.json() so Better-Auth can handle its own body parsing.
// Using '/api/auth/*splat' for Express 5.
app.all("/api/auth/*splat", toNodeHandler(auth));

// --- 2. GLOBAL MIDDLEWARES ---
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '10kb' }));

app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// --- 3. ROUTES ---
app.use('/api/v1/', routes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Server is running' });
});

// --- 4. ERROR HANDLING ---
app.use((req, res, next) => {
    next(new EntityNotFoundError({ message: `Can't find ${req.originalUrl} on this server!`, code: 'ERR_NF', statusCode: 404 }));
});

app.use(globalErrorHandler);

export default app;