import Task from "../models/task.model.js";

class TaskService {
  async getAllTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  async createTask(data) {
    return await Task.create(data);
  }

  async updateTask(id, data) {
    return await Task.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
  
  async moveTask(id, column) {
      return await Task.findByIdAndUpdate(id, { column }, { new: true });
  }
}

export default new TaskService();
