"use client";

import { useState, memo } from "react";
import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string, title: string, dueDate?: string) => void;
  onDelete: (id: string) => void;
}

const TaskItem = memo(function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "");

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(task.id, editTitle.trim(), editDueDate || undefined);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDueDate(task.dueDate || "");
    setIsEditing(false);
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate < today) return "overdue";
    if (dueDate.getTime() === today.getTime()) return "today";
    return "future";
  };

  const dueDateStatus = getDueDateStatus();

  return (
    <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-start sm:items-center gap-3 flex-1">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 mt-1 sm:mt-0 flex-shrink-0"
        />

        {isEditing ? (
          <div className="flex-1 space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                저장
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <p className={`${task.completed ? "line-through opacity-50" : ""} break-words`}>
                {task.title}
              </p>
              {task.dueDate && (
                <p className={`text-sm mt-1 ${dueDateStatus === "overdue" ? "text-red-500" :
                    dueDateStatus === "today" ? "text-orange-500" :
                      "text-gray-500"
                  }`}>
                  기한: {new Date(task.dueDate).toLocaleDateString("ko-KR")}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="flex gap-2 mt-2 sm:mt-0 ml-8 sm:ml-0">
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm sm:text-base"
          >
            편집
          </button>
          <button
            onClick={() => {
              if (window.confirm("이 작업을 삭제하시겠습니까?")) {
                onDelete(task.id);
              }
            }}
            className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm sm:text-base"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
});

export default TaskItem;