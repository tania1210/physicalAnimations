import { useEffect } from "react";
import { useGameStore } from "../../../store/game";

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

export const useSnakeMovement = (
  snakePositions: number[],
  direction: string,
  setSnakePosition: React.Dispatch<React.SetStateAction<number[]>>,
  setGameOver: (status: boolean) => void,
  foodPosition: number,
  setFoodPosition: (position: number) => void,
  generateFoodPosition: () => number
) => {
  const fieldSize = 10;
  const totalCells = fieldSize * fieldSize;

  const moveSnake = () => {
      const head = snakePositions[0];
      let newHead = head;

      switch (direction) {
          case "UP":
              newHead = (head - fieldSize + totalCells) % totalCells;
              break;
          case "DOWN":
              newHead = (head + fieldSize) % totalCells;
              break;
          case "LEFT":
              newHead = head % fieldSize === 0 ? head + (fieldSize - 1) : head - 1;
              break;
          case "RIGHT":
              newHead = (head + 1) % fieldSize === 0 ? head - (fieldSize - 1) : head + 1;
              break;
          default:
              break;
      }

      if (snakePositions.includes(newHead)) {
          setGameOver(true);
          return;
      }

      const newSnake = [newHead, ...snakePositions];

      if (newHead === foodPosition) {
          setFoodPosition(generateFoodPosition());
      } else {
          newSnake.pop();
      }

      setSnakePosition(newSnake);
  };

  useEffect(() => {
      const interval = setInterval(moveSnake, 300);
      return () => clearInterval(interval);
  }, [direction, snakePositions]);
};