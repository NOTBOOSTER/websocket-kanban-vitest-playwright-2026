const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");

const router = express.Router();

const upload = require("../middleware/upload");

router.route("/").get(getTasks).post(upload.single("attachment"), createTask);
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
