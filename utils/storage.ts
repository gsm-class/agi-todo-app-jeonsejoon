import { Task } from "@/types/task";
import { STORAGE_KEY } from "./constants";
import { migrateData } from "./migration";

export const loadTasks = (): Task[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const rawData = JSON.parse(stored);

    // 데이터 검증
    if (!Array.isArray(rawData)) return [];

    // マイグレーション適用
    const migratedData = migrateData(rawData);

    // 最終的なデータ検証
    const validTasks = migratedData.filter((task): task is Task => {
      return (
        typeof task === "object" &&
        task !== null &&
        typeof task.id === "string" &&
        typeof task.title === "string" &&
        typeof task.completed === "boolean" &&
        typeof task.createdAt === "string" &&
        typeof task.updatedAt === "string" &&
        (task.dueDate === undefined || typeof task.dueDate === "string")
      );
    });

    // マイグレーション後のデータを保存
    if (validTasks.length !== rawData.length) {
      saveTasks(validTasks);
    }

    return validTasks;
  } catch (error) {
    console.error("Failed to load tasks from localStorage:", error);
    return [];
  }
};

export const saveTasks = (tasks: Task[]): void => {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks to localStorage:", error);
  }
};