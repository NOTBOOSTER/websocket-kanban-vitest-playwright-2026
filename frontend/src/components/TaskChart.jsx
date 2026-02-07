import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const TaskChart = ({ tasks }) => {
  const statusCounts = {
    "To Do": 0,
    "In Progress": 0,
    Done: 0,
  };

  tasks.forEach((task) => {
    if (statusCounts[task.column] !== undefined) {
      statusCounts[task.column]++;
    }
  });

  const totalTasks = tasks.length;
  const completionRate = totalTasks ? Math.round((statusCounts.Done / totalTasks) * 100) : 0;

  const doughnutData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        data: [statusCounts["To Do"], statusCounts["In Progress"], statusCounts.Done],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)", // Indigo
          "rgba(245, 158, 11, 0.8)", // Amber
          "rgba(16, 185, 129, 0.8)", // Emerald
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(16, 185, 129, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-sm flex flex-col items-center h-full">
      <h3 className="text-gray-700 font-bold mb-4">Task Progress</h3>
      <div className="w-40 h-40 relative">
        <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
                <span className="text-xl font-bold text-gray-800">{completionRate}%</span>
                <p className="text-[10px] text-gray-500">Done</p>
            </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 w-full px-4">
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span> To Do
            </span>
            <span className="font-bold text-indigo-600">{statusCounts["To Do"]}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span> In Progress
            </span>
            <span className="font-bold text-amber-600">{statusCounts["In Progress"]}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Done
            </span>
            <span className="font-bold text-emerald-600">{statusCounts["Done"]}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
