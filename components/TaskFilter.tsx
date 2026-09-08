"use client";

import { memo } from "react";

interface TaskFilterProps {
  showCompleted: boolean;
  onToggleShowCompleted: (show: boolean) => void;
}

const TaskFilter = memo(function TaskFilter({ showCompleted, onToggleShowCompleted }: TaskFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow duration-200">
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={(e) => onToggleShowCompleted(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 transition-all duration-200"
        />
        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
          완료된 작업 표시
        </span>
      </label>
    </div>
  );
});

export default TaskFilter;