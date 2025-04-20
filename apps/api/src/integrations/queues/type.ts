import { Job } from 'bullmq';

export type JobFn<T = unknown> = (job: Job<T>) => Promise<void>;
