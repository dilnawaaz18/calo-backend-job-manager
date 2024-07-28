import fs from 'fs';
import path from 'path';
import axios from 'axios';
import JobModel from '../model/jobModel.js';
import dotenv from 'dotenv';
dotenv.config();
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobsFilePath = path.join(__dirname, '..', 'jobs.json');


//unsplash access key, saved in env
const accessKEy = process.env.UNSPLASH_KEY


export const readJobs = () => {
    if (!fs.existsSync(jobsFilePath)) {
        fs.writeFileSync(jobsFilePath, JSON.stringify([]));
    }
    const jobs = fs.readFileSync(jobsFilePath);
    return JSON.parse(jobs);
};

export const getAllJobRcords = () => {
    return readJobs();
}

const writeJobRecordTofile = (jobs) => {
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs));
};

export const createJobRecord = () => {
    const jobs = readJobs();
    const newJob = new JobModel();
    jobs.push(newJob);
    writeJobRecordTofile(jobs);
    simulateJobProcessing(newJob.id)
    return newJob.id;
}

export const readJobById = (jobId) => {
    const jobs = readJobs();
    return jobs.find(job => job.id === jobId);
}


//method to delay the job creation
const simulateJobProcessing = (jobId) => {

    // Calculate a random delay between 5 seconds and 5 minutes
    const minDelay = 5 * 1000; // 5 seconds
    const maxDelay = 5 * 60 * 100; // 5 minutes
    const delay = Math.floor(Math.random() * ((maxDelay - minDelay) / 5000 + 1)) * 5000; // Random delay in 5-second increments
    setTimeout(async () => {
        const jobs = readJobs();
        const job = jobs.find(job => job.id === jobId);
        if (job) {
            try {
                // Fetch food images from Unsplash
                const response = await axios.get('https://api.unsplash.com/search/photos', {
                    headers: {
                        Authorization: `Client-ID ${accessKEy}`,
                    },
                    params: {
                        query: 'food',
                        page: Math.floor(Math.random() * 100) + 1,
                        per_page: 1, // fetch only sinegle image
                    },
                });
                if (response.data.results.length > 0) {
                    const imageUrl = response.data.results[0].urls.full;
                    job.result = imageUrl;
                    job.status = 'resolved';
                }
            } catch (error) {
                console.log(error)
                job.status = 'failed';
            }
            writeJobRecordTofile(jobs);
        }
    }, delay);
}


