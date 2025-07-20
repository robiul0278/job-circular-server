import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userServices } from "./user.service";
import httpStatus from "http-status";

const getBookmark = catchAsync(async (req, res) => {

    const {userId} = req.params;

    const result = await userServices.getBookmarkDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookmark retrieved successfully!",
        data: result,
    })
})

const addBookmark = catchAsync(async (req, res) => {
    const {userId} = req.params;
    const {jobId} = req.body;
    const result = await userServices.addBookmarkDB(userId, jobId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookmark added successfully!",
        data: result,
    })
})
const removeBookmark = catchAsync(async (req, res) => {
    const {userId} = req.params;
    const {jobId} = req.body;
    const result = await userServices.removeBookmarkDB(userId, jobId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Bookmark remove successfully!",
        data: result,
    })
})

export const userController = {
    getBookmark,
    addBookmark,
    removeBookmark,
}