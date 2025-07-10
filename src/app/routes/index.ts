import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { jobRoutes } from "../modules/job/job.route";
import { userRoutes } from "../modules/user/user.route";

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
    path: '/jobs',
    route: jobRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;