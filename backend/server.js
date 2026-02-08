import dotenv from "dotenv";
dotenv.config();

import http from "http";
import app from "./app.js";
import connectDB from "./src/config/db.js";
import { Server } from "socket.io";
import logger from "./src/utils/logger.js";
import taskService from "./src/services/task.service.js";

// Connect to Database
connectDB();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Socket.IO Setup
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for simplicity
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  logger.info(`Socket Connected: ${socket.id}`);

  socket.on("sync:tasks", async () => {
      const tasks = await taskService.getAllTasks();
      socket.emit("sync:tasks", tasks);
  });

  socket.on("task:move", async (data) => {
    // We can also persist move here if we want strict consistency,
    // but typically we might just trust the update or do it via API.
    // For this app, let's persist it to DB to be safe
    await taskService.moveTask(data.id, data.column);
    socket.broadcast.emit("task:move", data); // Broadcast to others
  });

  socket.on("disconnect", () => {
    logger.info(`Socket Disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
