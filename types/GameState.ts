import { Task } from '@/types/Task';

export type GameState = {
  points: number;
  tasks: Task[];
  updatePoints: (amount: number) => void;
  completeTask: (taskId: number) => void;
  updateTaskProgress: (taskId: number, progress: number) => void;
};