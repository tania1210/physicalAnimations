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

export const useFood = (totalCells: number, snakePositions: number[]) => {
  const foodPosition = useGameStore((state) => state.foodPosition);
  const setFoodPosition = useGameStore((state) => state.setFoodPosition);

  function generateFoodPosition() {
    let newFoodPosition: number
    do {
      newFoodPosition = Math.floor(Math.random() * totalCells);
    } while (snakePositions.includes(newFoodPosition));
    setFoodPosition(newFoodPosition)
    return newFoodPosition;
  }

  return { foodPosition, setFoodPosition, generateFoodPosition };
};

export const useGameOver = () => {
  const gameOver = useGameStore((state) => state.gameOver);
  const setGameOver = useGameStore((state) => state.setGameOver);

  const restartGame = () => {
    setGameOver(false);
  };

  return { gameOver, setGameOver, restartGame };
};
