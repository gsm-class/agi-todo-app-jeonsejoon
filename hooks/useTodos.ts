"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Task } from "@/types/task";
import { loadTasks, saveTasks } from "@/utils/storage";

export const useTodos = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showCompleted, setShowCompleted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // 클라이언트 사이드인지 여부 판정
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 초기 로드
  useEffect(() => {
    if (isClient) {
      const loaded = loadTasks();
      setTasks(loaded);
      setIsLoading(false);
    }
  }, [isClient]);

  // 변경 시 자동 저장
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // 작업 추가
  const addTask = useCallback((title: string, dueDate?: string) => {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      dueDate,
      createdAt: now,
      updatedAt: now,
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  // 작업 편집
  const editTask = useCallback((id: string, title: string, dueDate?: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, title, dueDate, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  // 작업 삭제
  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

  // 완료 상태 전환
  const toggleComplete = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      )
    );
  }, []);

  // 필터링
  const filteredTasks = useMemo(() => {
    if (showCompleted) {
      return tasks;
    }
    return tasks.filter((task) => !task.completed);
  }, [tasks, showCompleted]);

  return {
    tasks: filteredTasks,
    isLoading,
    showCompleted,
    setShowCompleted,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    isClient,
  };
};