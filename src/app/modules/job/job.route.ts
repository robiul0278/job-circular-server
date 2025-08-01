import express from "express";
import validateRequest from "../../middleware/validateRequest";
import authGard from "../../middleware/authGard";
import { jobValidationSchema } from "./job.validation";
import { jobController } from "./job.controller";
import { USER_ROLE } from "../auth/auth.constant";

const router = express.Router();

// call controller function 
router.post('/post-circular',
    validateRequest(jobValidationSchema),
    jobController.createJob
);

router.patch('/update/:id',
    jobController.updateJob,
);
router.get('/',
    jobController.getAllJob
);
router.get('/categories',
    jobController.getJobCategory
);

router.get('/single/:slug',
    jobController.getSingleJob
);
router.post('/views/:id',
    jobController.updateViews
);
router.delete('/delete/:id',
    // authGard(USER_ROLE.user),
    jobController.deleteJob
);
router.get('/analytics',
    // authGard(USER_ROLE.user),
    jobController.analytics
);

export const jobRoutes = router;
