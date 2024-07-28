import { Router } from 'express';
import { createJob, getJobs, getJobById } from '../controller/jobController.js';
const expressRouter = Router();


//routes
expressRouter.post('/', createJob)
expressRouter.get('/', getJobs)
expressRouter.get('/:jobId', getJobById)

export default expressRouter