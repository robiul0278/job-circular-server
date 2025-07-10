import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

// 🔹 Get all bookmarks of a user
router.get(
  '/bookmark/:userId',
  userController.getBookmark,
);

// 🔹 Add a job to bookmarks
router.patch(
  '/bookmark/add/:userId',
  userController.addBookmark,
);

// 🔹 Optional: Remove a job from bookmarks
router.patch(
  '/bookmark/remove/:userId',
  userController.removeBookmark,
);

export const userRoutes = router;
