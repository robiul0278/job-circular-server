import { Schema, model } from 'mongoose';
import { TJobPost } from './job.interface';


const JobPostSchema = new Schema<TJobPost>(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    banner: { type: String, required: true },
    images: { 
      type: [String], 
      required: false,
      default: [],
    },
    deadline: { 
      type: String, 
      required: false,
         default: null
    },
    categories: {
      type: String,
      enum: ["govt", "private"],
      required: true,
    },
    description: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const jobModel = model<TJobPost>('Circular', JobPostSchema);
