import { useDrag } from "react-dnd";

const TaskCard = ({ task, onDelete }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(task);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High": return "bg-rose-100 text-rose-700 border-rose-200";
      case "Medium": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Low": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      ref={drag}
      className={`p-4 bg-white/90 shadow-sm rounded-xl border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 transform hover:-translate-y-1 group ${
        isDragging ? "opacity-50 scale-95" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-800 text-base leading-tight flex-1">{task.title}</h4>
        <button 
            onClick={handleDeleteClick}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="text-gray-400 hover:text-red-500 transition-colors opacity-100 p-1"
            title="Delete Task"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-3">
          {task.attachments[0].endsWith(".pdf") ? (
            <a 
                href={task.attachments[0]} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors"
                onClick={(e) => e.stopPropagation()}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-600 truncate flex-1">View PDF attachment</span>
            </a>
          ) : (
            <img 
                src={task.attachments[0]} 
                alt="Attachment" 
                className="w-full h-32 object-cover rounded-lg border border-gray-100"
                onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                }}
            />
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 border-t border-gray-50">
        <span
          className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getPriorityColor(task.priority)}`}
        >
          {task.priority}
        </span>
        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100">
          {task.category}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
