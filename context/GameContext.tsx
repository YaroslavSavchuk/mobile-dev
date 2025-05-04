import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameState } from '@/types/GameState';

const GameContext = createContext<GameState>({
  points: 0,
  updatePoints: (amount : number) => { },
});

type GameProviderProps = {
  children: ReactNode;
};

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [points, setPoints] = useState(0);

  const updatePoints = (amount: number) => {
    setPoints(prev => prev + amount);
    console.log("updated points", points)
  };

  return (
    <GameContext.Provider value={{ points, updatePoints }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
