import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, onDropTask, onDeleteTask }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, title),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getColumnColor = (title) => {
    switch (title) {
      case "To Do": return "border-indigo-500 bg-indigo-50/50";
      case "In Progress": return "border-amber-500 bg-amber-50/50";
      case "Done": return "border-emerald-500 bg-emerald-50/50";
      default: return "border-gray-500";
    }
  };

  const getHeaderColor = (title) => {
    switch (title) {
      case "To Do": return "text-indigo-700";
      case "In Progress": return "text-amber-700";
      case "Done": return "text-emerald-700";
      default: return "text-gray-700";
    }
  };

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[300px] rounded-xl p-4 min-h-[500px] transition-all duration-300 border-t-4 shadow-sm backdrop-blur-sm ${
        getColumnColor(title)
      } ${isOver ? "bg-white/80 ring-2 ring-indigo-400 ring-opacity-50" : ""}`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className={`font-bold text-lg ${getHeaderColor(title)}`}>{title}</h3>
        <span className="bg-white/60 px-2 py-1 rounded text-xs font-semibold text-gray-600 shadow-sm border border-gray-100">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3 h-full overflow-y-auto pr-1 custom-scrollbar">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={onDeleteTask} />
        ))}
      </div>
    </div>
  );
};

export default Column;
