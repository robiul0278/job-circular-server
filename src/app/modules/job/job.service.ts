import QueryBuilder from "../../../helper/QueryBuilder";
import { TJobPost } from "./job.interface";
import { jobModel } from "./job.model";

const createJobDB = async (payload: TJobPost) => {
  const result = await jobModel.create(payload);
  return result;
}

const updateJobDB = async (id: string, payload: TJobPost) => {

  const result = await jobModel.findByIdAndUpdate(
    id,
    { $set: payload },
    { new: true }
  );

  return result;
}

const getAllJobDB = async (query: Record<string, unknown>) => {
  const searchableField = ['companyName', 'title', 'departments']
  const Select = '-description -images -updatedAt -__v'

  const jobQuery = new QueryBuilder(
    jobModel.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields(Select);

  const result = await jobQuery.modelQuery;
  const meta = await jobQuery.countTotal();

  // Aggregate categories
  const categories = await jobModel.aggregate([
    { $group: { _id: "$categories", count: { $sum: 1 } } }, 
    { $project: { category: "$_id", count: 1, _id: 0 } }, 
    { $sort: { count: -1 } }]);

  return {
    meta,
    categories,
    result,
  }
}


const singleJobDB = async (slug: string) => {
  const result = await jobModel.findOne({ slug });

  return result;
}


const updateViewsDB = async (id: string) => {
  const result = await jobModel.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
  return result;
};

const deleteJobDB = async (jobId: string) => {
  const result = await jobModel.findByIdAndDelete(jobId);
  return result;
}


const analyticsDB = async () => {
  const [
    totalCirculars,
    totalViewsAgg,
    monthlyTrend,
    categoryWiseCount,
  ] = await Promise.all([
    // 1. Total circular count
    jobModel.countDocuments(),

    // 2. Total views aggregated
    jobModel.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]),

    // 3. Monthly trend
    jobModel.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] }, // "YYYY-MM"
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    // 4. Category-wise circular count
    jobModel.aggregate([
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  return {
    totalCirculars,
    totalViews: totalViewsAgg[0]?.totalViews || 0,
    monthlyTrend,
    categoryWiseCount,
  };
};



export const jobServices = {
  createJobDB,
  updateJobDB,
  getAllJobDB,
  singleJobDB,
  updateViewsDB,
  deleteJobDB,
  analyticsDB,
}