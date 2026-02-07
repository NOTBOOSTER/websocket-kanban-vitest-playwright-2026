import React from "react";

const TaskFilter = ({ filters, setFilters }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider text-xs">
          Priority
        </label>
        <select
          className="block w-32 rounded-lg border-gray-200 bg-white/80 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 hover:bg-white transition-colors cursor-pointer"
          value={filters.priority}
          onChange={(e) =>
            setFilters({ ...filters, priority: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider text-xs">
          Category
        </label>
        <select
          className="block w-32 rounded-lg border-gray-200 bg-white/80 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3 hover:bg-white transition-colors cursor-pointer"
          value={filters.category}
          onChange={(e) =>
            setFilters({ ...filters, category: e.target.value })
          }
        >
          <option value="">All</option>
          <option value="Feature">Feature</option>
          <option value="Bug">Bug</option>
          <option value="Enhancement">Enhancement</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
