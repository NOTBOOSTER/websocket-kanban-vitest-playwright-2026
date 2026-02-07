import React, { useState } from "react";
import { taskApi } from "../services/api";

const TaskForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Feature",
    column: "To Do",
    attachments: [],
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setSelectedFile(file);






        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("priority", formData.priority);
      data.append("category", formData.category);
      data.append("column", formData.column);
      if (selectedFile) {
        data.append("attachment", selectedFile);
      }

      await taskApi.create(data);
      onClose();
    } catch (err) {
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity">
      <div className="bg-white rounded-2xl p-8 w-full max-w-lg shadow-2xl border border-gray-100 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">New Task</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Redesign Landing Page"
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Add details about this task..."
              className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border transition-shadow"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div>
             <label className="block text-sm font-semibold text-gray-700 mb-1">
              Attachment
             </label>
             <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-500 transition-colors bg-gray-50 hover:bg-white">
                <div className="space-y-1 text-center">
                    {preview ? (
                        <div className="relative group">
                            <img src={preview} alt="Preview" className="mx-auto h-32 object-cover rounded-md" />
                            <button 
                                type="button"
                                onClick={() => {
                                    setPreview(null);
                                    setSelectedFile(null);
                                    setFormData({ ...formData, attachments: [] });
                                }}
                                className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    ) : (
                        <>
                            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex text-sm text-gray-600 justify-center">
                                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/* pdf/*" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">IMage and PDF up to 5MB</p>
                        </>
                    )}
                </div>
             </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Priority
              </label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <select
                className="mt-1 block w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option>Feature</option>
                <option>Bug</option>
                <option>Enhancement</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-8 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-gray-600 font-medium hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all transform active:scale-95"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
