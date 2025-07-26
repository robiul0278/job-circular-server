import QueryBuilder from "../../../helper/QueryBuilder";
import { TJobPost } from "./job.interface";
import { jobModel } from "./job.model";

const createJobDB = async (payload: TJobPost) => {
  const result = await jobModel.create(payload);
  return result;
}

const getAllJobDB = async (query: Record<string, unknown>) => {
  const searchableField = ['companyName', 'title', 'categories']
  const Select = '-description -images -websiteLink -published -applyStart -technology -updatedAt -__v'

  const jobQuery = new QueryBuilder(
    jobModel.find(), query)
    .search(searchableField)
    .filter()
    .sort()
    .paginate()
    .fields(Select);

  const result = await jobQuery.modelQuery;
  const meta = await jobQuery.countTotal();

  return {
    meta,
    result,
  }
}

const getJobCategoryDB = async () => {
  // ✅ Extra: Count posts per technology
  const technology = await jobModel.aggregate([
    { $unwind: "$technology" }, // because it's an array
    { $group: { _id: "$technology", count: { $sum: 1 } } },
    { $project: { technology: "$_id", count: 1, _id: 0 } },
    { $sort: { count: -1 } }
  ]);

  // ✅ Extra: Count posts per category
  const category = await jobModel.aggregate([
    {
      $group: {
        _id: "$categories", // group by 'categories' field
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: "$_id",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);
  return {
    category,
    technology
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
  const today = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 6);

  const [
    totalCirculars,
    ongoingCirculars,
    nearDeadlineCirculars,
    totalViews,
    monthlyTrend,
    categoryWiseCount,
    weeklyTrend
  ] = await Promise.all([
    jobModel.countDocuments(),

    jobModel.countDocuments({
      deadline: { $gt: today.toISOString().split('T')[0] },
    }),

    jobModel.countDocuments({
      deadline: {
        $gte: today.toISOString().split('T')[0],
        $lte: new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      },
    }),

    jobModel.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]),

    jobModel.aggregate([
      {
        $group: {
          _id: { $substr: ["$createdAt", 0, 7] }, // "YYYY-MM"
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),

    jobModel.aggregate([
      {
        $group: {
          _id: "$categories",
          count: { $sum: 1 },
        },
      },
    ]),

    jobModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  return {
    totalCirculars,
    ongoingCirculars,
    nearDeadlineCirculars,
    totalViews: totalViews[0]?.totalViews || 0,
    monthlyTrend,
    categoryWiseCount,
    weeklyTrend,
  };
};


export const jobServices = {
  createJobDB,
  getAllJobDB,
  getJobCategoryDB,
  singleJobDB,
  updateViewsDB,
  deleteJobDB,
  analyticsDB,
}