import React from "react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-center font-sans text-gray-800 h-16 mt-4">Kanban Board</h1>
      <KanbanBoard />
    </div>
  );
}

export default App;
