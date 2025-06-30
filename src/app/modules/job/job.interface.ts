export type IJobPost = {
  jobId: string;
  jobTitle: string;
  companyName: string;
  image?: string;
  education: string[];
  description: string;
  vacancy: number;
  views: number;
  published: string;
  startApply: string;
  deadline: string;
  applyLink: string;
}