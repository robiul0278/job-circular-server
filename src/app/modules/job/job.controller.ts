import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { jobServices } from "./job.service";

const createJob = catchAsync(async (req, res) => {
    const result = await jobServices.createJobDB(req.body);

    console.log(req.body);

    // send response 
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job create successfully!",
        data: result,
    })
})
const getAllJob = catchAsync(async (req, res) => {
    // console.log("USER", req.user);
    // console.log("TOKEN", req.cookies);
    const query = req.query;

    const result = await jobServices.getAllJobDB(query);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "All Job get successfully!",
        data: result,
    })
})
const getSingleJob = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await jobServices.singleJobDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get single job successfully!",
        data: result,
    })
})
const updateJobView = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await jobServices.updateJobViewsDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update views successfully!",
        data: result,
    })
})
const deleteJob = catchAsync(async (req, res) => {
    const {id} = req.params;

    const result = await jobServices.deleteJobDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Job delete successfully!",
        data: result,
    })
})

export const jobController = {
    createJob,
    getAllJob,
    getSingleJob,
    updateJobView,
    deleteJob,
}