import { getAllJobRcords, readJobById, createJobRecord } from '../service/jobService.js'

//create job conroller method
export function createJob(request, response) {
    const jobId = createJobRecord();
    response.status(201).json({ jobId })

}

//get jobs conroller method
export function getJobs(request, response) {
    const jobs = getAllJobRcords();
    response.status(200).json(jobs)
}

//get job by id conroller method
export function getJobById(request, response) {
    const job = readJobById(request.params.jobId);
    if (job) {
        response.status(200).json(job);
    }
    else {
        response.status(404).json({ message: 'Job with the provided id not found' })
    }
}