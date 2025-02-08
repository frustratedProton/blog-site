import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import indexRouter from './routers/indexRouter.js';

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:4173',
            'http://localhost:5173',
        ];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

export default app;
