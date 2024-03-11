import { Job } from 'bullmq';

export type JobFn = (job: Job) => Promise<void>;
