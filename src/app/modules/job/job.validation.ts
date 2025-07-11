import { z } from 'zod';

export const jobValidationSchema = z.object({
  body: z.object({
    jobId: z.string().min(1, "Job ID is required"),
    jobTitle: z.string().min(1, "Job title is required"),
    companyName: z.string().min(1, "Company name is required"),
    image: z.string().url("Invalid image URL"),
    technology: z.array(z.string().min(1)).min(1, "At least one technology field is required"),
    description: z.string().min(10, "Job description is too short"),
    vacancy: z.number().int().positive("Vacancy must be a positive number"),
    views: z.number().nonnegative().optional(),
    published: z.string().min(1, "Published date is required"),
    startApply: z.string().min(1, "Start apply date is required"),
    deadline: z.string().min(1, "Deadline is required"),
    applyLink: z.string().url("Invalid apply link URL")
  })
});
