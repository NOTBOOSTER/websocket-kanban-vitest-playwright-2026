import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./Column";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskChart from "./TaskChart";
import { useTasks } from "../hooks/useTasks";

const KanbanBoard = () => {
  const { tasks, loading, error, moveTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({ priority: "", category: "" });

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.priority === "" || task.priority === filters.priority) &&
      (filters.category === "" || task.category === filters.category)
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col">
        <div className="flex flex-col xl:flex-row justify-between items-start mb-6 gap-4 h-full">
          <div className="flex-1 w-full h-full flex flex-col min-w-0">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4 bg-white/50 p-4 rounded-xl backdrop-blur-sm shadow-sm border border-white/20 shrink-0">
              <TaskFilter filters={filters} setFilters={setFilters} />
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Task
              </button>
            </div>

            <div className="flex gap-6 overflow-x-auto overflow-y-hidden pb-4 flex-1">
              <div className="flex gap-6 h-full min-w-max px-2">
                {["To Do", "In Progress", "Done"].map((col) => (
                  <Column
                    key={col}
                    title={col}
                    tasks={filteredTasks.filter((t) => t.column === col)}
                    onDropTask={moveTask}
                  />
                ))}
              </div>
              <div className="flex flex-col mt-8 items-center w-full">
                <div className="hidden xl:block w-80 shrink-0 ">
                  <TaskChart tasks={tasks} />
                </div>

                <div className="xl:hidden mt-8 w-full">
                  <TaskChart tasks={tasks} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && <TaskForm onClose={() => setIsModalOpen(false)} />}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;
