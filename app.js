import express, { json } from 'express';
import cors from 'cors';
import jobRoutes from './routes/jobRoutes.js';
const application = express();
const PORT = 3001;


// Enable CORS for all origins (not recommended for production)
application.use(cors());
application.use(json());
application.use('/jobs', jobRoutes)
application.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
});