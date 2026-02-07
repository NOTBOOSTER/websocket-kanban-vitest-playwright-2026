const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const requestLogger = require("./src/middleware/requestLogger");
const errorHandler = require("./src/middleware/errorHandler");
const taskRoutes = require("./src/routes/task.routes");

const app = express();

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const path = require("path");

// Request Logger
app.use(requestLogger);

// Serve Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/tasks", taskRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
