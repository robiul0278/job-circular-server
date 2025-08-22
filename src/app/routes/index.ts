import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { jobRoutes } from "../modules/job/job.route";
import { userRoutes } from "../modules/user/user.route";
import { noticeRoutes } from "../modules/notice/notice.route";

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/circulars',
    route: jobRoutes,
  },
  {
    path: '/notice',
    route: noticeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;