import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [50, "Title cannot be more than 50 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
    column: {
      type: String,
      enum: ["To Do", "In Progress", "Done"],
      default: "To Do",
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    category: {
      type: String,
      enum: ["Feature", "Bug", "Enhancement"],
      default: "Feature",
    },
    attachments: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Task", TaskSchema);
