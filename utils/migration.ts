import { Task } from "@/types/task";

const MIGRATION_VERSION_KEY = 'todos_version';
const CURRENT_VERSION = 1;

export const migrateData = (data: any[]): Task[] => {
  const storedVersion = localStorage.getItem(MIGRATION_VERSION_KEY);
  const version = storedVersion ? parseInt(storedVersion, 10) : 0;

  let migratedData = data;

  // 버전 0에서 1: 모든 필수 필드가 존재하는지 확인
  if (version < 1) {
    migratedData = data.map((item) => {
      const now = new Date().toISOString();
      return {
        id: item.id || crypto.randomUUID(),
        title: item.title || item.name || '제목 없는 작업',
        completed: item.completed ?? item.done ?? false,
        dueDate: item.dueDate || item.deadline || undefined,
        createdAt: item.createdAt || item.created || now,
        updatedAt: item.updatedAt || item.updated || now,
      };
    });
  }

  // 현재 버전 저장
  localStorage.setItem(MIGRATION_VERSION_KEY, CURRENT_VERSION.toString());

  return migratedData;
};