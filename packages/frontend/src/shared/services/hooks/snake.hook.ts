import { useEffect } from "react";
import { useGameStore } from "../../../store/game";
import { FIELD_SIZE, TOTAL_CELLS } from "../../constants/snake-page.constant";

export const useFood = (snakePositions: number[]) => {
  const foodPosition = useGameStore((state) => state.foodPosition);
  const setFoodPosition = useGameStore((state) => state.setFoodPosition);

  function generateFoodPosition() {
    let newFoodPosition: number
    do {
      newFoodPosition = Math.floor(Math.random() * TOTAL_CELLS);
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
  const moveSnake = () => {
      const head = snakePositions[0];
      let newHead = head;

      switch (direction) {
          case "UP":
              newHead = (head - FIELD_SIZE + TOTAL_CELLS) % TOTAL_CELLS;
              break;
          case "DOWN":
              newHead = (head + FIELD_SIZE) % TOTAL_CELLS;
              break;
          case "LEFT":
              newHead = head % FIELD_SIZE === 0 ? head + (FIELD_SIZE - 1) : head - 1;
              break;
          case "RIGHT":
              newHead = (head + 1) % FIELD_SIZE === 0 ? head - (FIELD_SIZE - 1) : head + 1;
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

export const useKeyPress = (setDirection: React.Dispatch<React.SetStateAction<string>>) => {
  const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setDirection("UP");
      if (e.key === "ArrowDown") setDirection("DOWN");
      if (e.key === "ArrowLeft") setDirection("LEFT");
      if (e.key === "ArrowRight") setDirection("RIGHT");
  };

  useEffect(() => {
      window.addEventListener("keydown", handleKeyPress);
      return () => window.removeEventListener("keydown", handleKeyPress);
  });
};