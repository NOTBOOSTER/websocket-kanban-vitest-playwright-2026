import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import upload from "../middleware/upload.js";
import { uploadLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.route("/")
    .get(getTasks)
    .post(uploadLimiter, upload.single("attachment"), createTask);

router.route("/:id")
    .put(updateTask)
    .delete(deleteTask);

export default router;
