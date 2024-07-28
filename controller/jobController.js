import { getAllJobRcords, readJobById, createJobRecord } from '../service/jobService.js'


export function createJob(request, response) {
    const jobId = createJobRecord();
    response.status(201).json({ jobId })

}

export function getJobs(request, response) {
    const jobs = getAllJobRcords();
    response.status(200).json(jobs)
}

export function getJobById(request, response) {
    console.log('request========>', request.params.jobId)
    const job = readJobById(request.params.jobId);
    console.log('jobbbbbbbbbbbbbbbbb', job)
    if (job) {
        response.status(200).json(job);
    }
    else {
        response.status(404).json({ message: 'Job with the provided id not found' })
    }
}