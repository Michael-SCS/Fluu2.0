import { create } from "zustand";

export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

type TasksStore = {
  tasks: Task[];

  addTask: (title: string) => void;

  addTaskFromTemplate: (title: string) => void;

  toggleTask: (id: string) => void;

  deleteTask: (id: string) => void;
};

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: [],

  addTask: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now().toString(),
          title,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    })),

  addTaskFromTemplate: (title) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: Date.now().toString(),
          title,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    })),

  toggleTask: (id) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      ),
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
}));