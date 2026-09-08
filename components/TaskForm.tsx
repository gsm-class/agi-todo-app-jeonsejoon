"use client";

import { useState, memo } from "react";

interface TaskFormProps {
  onAddTask: (title: string, dueDate?: string) => void;
}

const TaskForm = memo(function TaskForm({ onAddTask }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), dueDate || undefined);
      setTitle("");
      setDueDate("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // IME 변환 중(isComposing)인 경우 Enter 키 무시
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">새 작업 추가</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            작업 이름
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            placeholder="작업 입력..."
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            기한 (선택)
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            {dueDate && (
              <button
                type="button"
                onClick={() => setDueDate("")}
                className="px-3 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
              >
                지우기
              </button>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          작업 추가
        </button>
      </div>
    </form>
  );
});

export default TaskForm;