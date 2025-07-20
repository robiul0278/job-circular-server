import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { NoticeServices } from "./notice.service";

const CreateNotice = catchAsync(async (req, res) => {

    const result = await NoticeServices.CreateNoticeDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Post Notice successfully!",
        data: result,
    })
})
const AllNotice = catchAsync(async (req, res) => {

    const result = await NoticeServices.AllNoticeDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Get All Notice successfully!",
        data: result,
    })
})

export const NoticeController = {
    CreateNotice,
    AllNotice,
}