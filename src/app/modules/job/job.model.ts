import { Schema, model } from 'mongoose';
import { IJobPost } from './job.interface';

const JobPostSchema = new Schema<IJobPost>(
  {
    jobId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    companyName: { type: String, required: true },
    image: { type: String, required: true },
    education: { type: [String], required: true },
    description: { type: String, required: true },
    vacancy: { type: Number, required: true },
    views: { type: Number, default: 0 },
    published: { type: String, required: true },
    startApply: { type: String, required: true },
    deadline: { type: String, required: true },
    applyLink: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const jobModel = model<IJobPost>('Job', JobPostSchema);
