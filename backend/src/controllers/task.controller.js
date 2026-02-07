const taskService = require("../services/task.service");
const asyncHandler = require("../utils/asyncHandler");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await taskService.getAllTasks();
  res.status(200).json({ success: true, data: tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const taskData = req.body;
  if (req.file) {
    const protocol = req.protocol;
    const host = req.get("host");
    const fullUrl = `${protocol}://${host}/uploads/${req.file.filename}`;
    taskData.attachments = [fullUrl];
  }
  
  const task = await taskService.createTask(taskData);
  req.app.get("io").emit("task:create", task);
  res.status(201).json({ success: true, data: task });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.params.id, req.body);
  req.app.get("io").emit("task:update", task);
  res.status(200).json({ success: true, data: task });
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.params.id);
  req.app.get("io").emit("task:delete", req.params.id);
  res.status(200).json({ success: true, message: "Task deleted" });
});

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
