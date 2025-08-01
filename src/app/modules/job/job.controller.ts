import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { jobServices } from "./job.service";

const createJob = catchAsync(async (req, res) => {
    const result = await jobServices.createJobDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job create successfully!",
        data: result,
    })
})
const updateJob = catchAsync(async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result = await jobServices.updateJobDB(id, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job updated successfully!",
        data: result,
    })
})
const getAllJob = catchAsync(async (req, res) => {
    const query = req.query;
    const result = await jobServices.getAllJobDB(query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Job get successfully!",
        data: result,
    })
})

const getJobCategory = catchAsync(async (req, res) => {
    const result = await jobServices.getJobCategoryDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get all job categories successful!",
        data: result,
    })
})

const getSingleJob = catchAsync(async (req, res) => {
    const { slug } = req.params;

    const result = await jobServices.singleJobDB(slug);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get single job successfully!",
        data: result,
    })
})
const updateViews = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await jobServices.updateViewsDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update views successfully!",
        data: result,
    })
})
const deleteJob = catchAsync(async (req, res) => {
    const { id } = req.params;

    const result = await jobServices.deleteJobDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job delete successfully!",
        data: result,
    })
})
const analytics = catchAsync(async (req, res) => {

    const result = await jobServices.analyticsDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Dashboard analytics get successfully!",
        data: result,
    })
})

export const jobController = {
    createJob,
    updateJob,
    getAllJob,
    getJobCategory,
    getSingleJob,
    updateViews,
    deleteJob,
    analytics,
}