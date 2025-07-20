import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { noticeValidationSchema } from "./notice.validation";
import { NoticeController } from "./notice.controller";

const router = express.Router();

router.post('/create-notice',
    validateRequest(noticeValidationSchema),
    NoticeController.CreateNotice
);
router.get('/',
    NoticeController.AllNotice
);

export const noticeRoutes = router;
