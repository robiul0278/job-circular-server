import { Schema, model } from 'mongoose';
import { TJobPost } from './job.interface';


const JobPostSchema = new Schema<TJobPost>(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    banner: { type: String, required: true },
    images: { type: [String], required: true },
    vacancy: { type: String, required: true },
    deadline: { type: String, required: true },
    categories: {
      type: String,
      enum: ["government", "private", "autonomous"],
      required: true,
    },
    departments: { type: [String], required: true },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const jobModel = model<TJobPost>('Circular', JobPostSchema);
