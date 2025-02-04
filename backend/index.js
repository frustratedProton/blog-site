import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routers/indexRouter.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

export default app;
