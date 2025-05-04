import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState } from '@/types/GameState';
import { Task } from '@/types/Task';

const defaultTasks: Task[] = [
  { id: 1, description: 'Make 10 clicks', type: 'clicks', required: 10, completed: false, progress: 0 },
  { id: 2, description: 'Double-click 5 times', type: 'doubleClicks', required: 5, completed: false, progress: 0 },
  { id: 3, description: 'Hold object for 3 second', type: 'longPress', required: 1, completed: false },
  { id: 4, description: 'Drag object', type: 'drag', required: 1, completed: false },
  { id: 5, description: 'Swipe right', type: 'swipeRight', required: 1, completed: false },
  { id: 6, description: 'Swipe left', type: 'swipeLeft', required: 1, completed: false },
  { id: 7, description: 'Resize object', type: 'resize', required: 1, completed: false },
  { id: 8, description: 'Get 100 points', type: 'totalPoints', required: 100, completed: false, progress: 0 },
];

const GameContext = createContext<GameState>({
  points: 0,
  tasks: defaultTasks,
  updatePoints: () => {},
  completeTask: () => {},
  updateTaskProgress: () => {},
});

type GameProviderProps = {
  children: ReactNode;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState(defaultTasks);

  const updatePoints = (amount: number) => {
    setPoints(prev => {
      const newPoints = prev + amount;
      setTasks(prevTasks => prevTasks.map(task => 
        task.type === 'totalPoints' && newPoints >= task.required ? 
        { ...task, completed: true } : task
      ));
      return newPoints;
    });
  };

  const completeTask = (taskId: number) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === taskId && !task.completed ? { ...task, completed: true } : task
    ));
  };

  const updateTaskProgress = (taskId: number, progress: number) => {
    setTasks(prevTasks => prevTasks.map(task => {
      if (task.id === taskId && !task.completed) {
        const newProgress = (task.progress || 0) + progress;
        return { ...task, progress: newProgress, completed: newProgress >= task.required };
      }
      return task;
    }));
  };

  return (
    <GameContext.Provider value={{ points, tasks, updatePoints, completeTask, updateTaskProgress }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);