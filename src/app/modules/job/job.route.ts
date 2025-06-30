import express from "express";
import validateRequest from "../../middleware/validateRequest";
import authGard from "../../middleware/authGard";
import { jobValidationSchema } from "./job.validation";
import { jobController } from "./job.controller";
import { USER_ROLE } from "../auth/auth.constant";

const router = express.Router();

// call controller function 
router.post('/create',
    validateRequest(jobValidationSchema),
    jobController.createJob
);

router.get('/',
    // authGard(USER_ROLE.user),
    jobController.getAllJob
);

router.get('/:id',
    // authGard(USER_ROLE.user),
    jobController.getSingleJob
);
router.post('/views/:id',
    // authGard(USER_ROLE.user),
    jobController.updateJobView
);
router.delete('/delete/:id',
    // authGard(USER_ROLE.user),
    jobController.deleteJob
);

export const jobRoutes = router;