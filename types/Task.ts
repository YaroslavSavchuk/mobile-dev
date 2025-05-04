export type Task = {
  id: number;
  description: string;
  type: string;
  required: number;
  completed: boolean;
  progress?: number;
};
