require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./src/config/db");
const Logger = require("./src/utils/logger");
const taskService = require("./src/services/task.service");

const logger = new Logger("Server");

// Connect to Database
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all for dev, restrict in prod
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

// Attach Socket.io to App
app.set("io", io);

// Socket.IO Logic
io.on("connection", (socket) => {
  logger.info(`New client connected: ${socket.id}`);

  // Send initial tasks
  taskService.getAllTasks().then((tasks) => {
    socket.emit("sync:tasks", tasks);
  });

  socket.on("task:create", async (data) => {
    try {
      const newTask = await taskService.createTask(data);
      io.emit("task:create", newTask);
      logger.info(`Task created: ${newTask.title}`);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("task:update", async (data) => {
    try {
      const { id, ...updateData } = data;
      const updatedTask = await taskService.updateTask(id, updateData);
      io.emit("task:update", updatedTask);
      logger.info(`Task updated: ${id}`);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("task:move", async (data) => {
    try {
      const { id, column } = data;
      const movedTask = await taskService.moveTask(id, column);
      io.emit("task:move", movedTask);
      logger.info(`Task moved: ${id} to ${column}`);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("task:delete", async (id) => {
    try {
      await taskService.deleteTask(id);
      io.emit("task:delete", id);
      logger.info(`Task deleted: ${id}`);
    } catch (err) {
      socket.emit("error", err.message);
    }
  });

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  logger.success(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  logger.error("Unhandled Rejection", err);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  logger.error("Uncaught Exception", err);
  process.exit(1);
});
