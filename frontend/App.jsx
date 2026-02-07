import React from "react";
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 text-gray-800 font-sans">
      <div className="container mx-auto p-6 h-screen flex flex-col">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-indigo-900 tracking-tight">Kanban Board</h1>
            <p className="text-indigo-600/80 text-sm font-medium">Real-time collaboration workspace</p>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <KanbanBoard />
        </main>
      </div>
    </div>
  );
}

export default App;
