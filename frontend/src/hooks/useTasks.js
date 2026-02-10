import { useState, useEffect } from "react";
import { socketService } from "../services/socket";
import { taskApi } from "../services/api";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const socket = socketService.connect();

    // Initial load
    taskApi
      .getAll()
      .then((res) => {
        setTasks(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    // Socket Events
    socketService.on("sync:tasks", (data) => setTasks(data));
    socketService.on("task:create", (newTask) => {
      setTasks((prev) => [newTask, ...prev]);
    });
    socketService.on("task:update", (updatedTask) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
      );
    });
    socketService.on("task:move", ({ id, column }) => {
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, column } : t))
      );
    });
    socketService.on("task:delete", (deletedId) => {
      setTasks((prev) => prev.filter((t) => t._id !== deletedId));
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  const moveTask = (id, column) => {
    // Optimistic update
    setTasks((prev) =>
      prev.map((t) => (t._id === id ? { ...t, column } : t))
    );
    socketService.emit("task:move", { id, column });
  };

  return { tasks, loading, error, moveTask };
};
