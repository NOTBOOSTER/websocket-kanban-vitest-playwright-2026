const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    column: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
      required: true,
    },
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: ["Feature", "Bug", "Enhancement"],
      default: "Feature",
    },
    // Array of attachment URLs/Paths
    attachments: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
