const Task = require("../models/task.model");
const ApiError = require("../utils/ApiError");

class TaskService {
  async createTask(data) {
    return await Task.create(data);
  }

  async getAllTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  async updateTask(id, data) {
    const task = await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!task) throw new ApiError(404, "Task not found");
    return task;
  }

  async deleteTask(id) {
    const task = await Task.findByIdAndDelete(id);
    if (!task) throw new ApiError(404, "Task not found");
    return task;
  }

  async moveTask(id, column) {
    const task = await Task.findByIdAndUpdate(
      id,
      { column },
      { new: true, runValidators: true }
    );
    if (!task) throw new ApiError(404, "Task not found");
    return task;
  }
}

module.exports = new TaskService();
