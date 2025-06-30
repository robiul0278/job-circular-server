import QueryBuilder from "../../../helper/QueryBuilder";
import { IJobPost } from "./job.interface";
import { jobModel } from "./job.model";

const createJobDB = async (payload: IJobPost) => {
    const result = await jobModel.create(payload);
    return result;
}

const getAllJobDB = async (query: Record<string, unknown>) => {
    const searchableField = ['companyName', 'jobTitle']

    const jobQuery = new QueryBuilder(
        jobModel.find(), query)
        .search(searchableField)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await jobQuery.modelQuery;
    const meta = await jobQuery.countTotal();

    return{
        meta,
        result
    }
}

const singleJobDB = async (jobId: string) => {
    const result = await jobModel.findOne({jobId});
    return result;
}


const updateJobViewsDB = async (id: string) => {
  const result = await jobModel.findOneAndUpdate(
    { jobId: id },
    { $inc: { views: 1 } },
    { new: true }
  );
  return result;
};

const deleteJobDB = async (jobId: string) => {
    const result = await jobModel.deleteOne({jobId});
    return result;
}



export const jobServices = {
    createJobDB,
    getAllJobDB,
    singleJobDB,
    updateJobViewsDB,
    deleteJobDB
}