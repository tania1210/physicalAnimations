import { create } from "zustand";

interface GameStore {
    foodPosition: number;
    setFoodPosition: (position: number) => void;
    gameOver: boolean;
    setGameOver: (status: boolean) => void;
  }
  
  export const useGameStore = create<GameStore>((set) => ({
    foodPosition: 0,
    setFoodPosition: (position: number) => set({ foodPosition: position}),
    gameOver: false,
    setGameOver: (status: boolean) => set({ gameOver: status})
  }))