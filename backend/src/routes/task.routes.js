import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.route("/")
    .get(getTasks)
    .post(upload.single("attachment"), createTask);

router.route("/:id")
    .put(updateTask)
    .delete(deleteTask);

export default router;
