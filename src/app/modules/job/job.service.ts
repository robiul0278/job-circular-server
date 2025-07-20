import QueryBuilder from "../../../helper/QueryBuilder";
import { TJobPost } from "./job.interface";
import { jobModel } from "./job.model";

const createJobDB = async (payload: TJobPost) => {
    const result = await jobModel.create(payload);
    return result;
}

const getAllJobDB = async (query: Record<string, unknown>) => {
    const searchableField = ['companyName', 'title', 'technology']

    const jobQuery = new QueryBuilder(
        jobModel.find(), query)
        .search(searchableField)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await jobQuery.modelQuery;
    const meta = await jobQuery.countTotal();

    // ✅ Extra: Count posts per technology
    const technologyCount = await jobModel.aggregate([
        { $unwind: "$technology" }, // because it's an array
        { $group: { _id: "$technology", count: { $sum: 1 } } },
        { $project: { technology: "$_id", count: 1, _id: 0 } },
        { $sort: { count: -1 } }
    ]);

    // ✅ Extra: Count posts per category
    const categoryCount = await jobModel.aggregate([
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
        meta,
        result,
        categoryCount,
        technologyCount,
    }
}

const singleJobDB = async (slug: string) => {
    const result = await jobModel.findOne({ slug });
    return result;
}


const updateViewsDB = async (id: string) => {
    const result = await jobModel.findByIdAndUpdate(
         id ,
        { $inc: { views: 1 } },
        { new: true }
    );
    return result;
};

const deleteJobDB = async (jobId: string) => {
    const result = await jobModel.findByIdAndDelete(jobId);
    return result;
}

export const jobServices = {
    createJobDB,
    getAllJobDB,
    singleJobDB,
    updateViewsDB,
    deleteJobDB
}