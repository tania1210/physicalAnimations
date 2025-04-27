import { useState } from "react"
import { useFood, useGameOver, useSnakeMovement } from "../shared/services/hooks/snake.hook"
import { useKeyPress } from "../shared/services/hooks/keyboard_event.hook"

const SnakePage = () => {
    const fieldSize = 10
    const totalCells = fieldSize * fieldSize

    const [snakePositions, setSnakePosition] = useState<number[]>([44])
    const [direction, setDirection] = useState<string>("RIGHT")

    const {foodPosition, setFoodPosition, generateFoodPosition} = useFood(totalCells, snakePositions)
    const {gameOver, setGameOver} = useGameOver()

    useKeyPress(setDirection);

    useSnakeMovement(
        snakePositions, 
        direction, 
        setSnakePosition, 
        setGameOver, 
        foodPosition, 
        setFoodPosition, 
        generateFoodPosition
    );

    return (
        <div>
            {gameOver && (
                <div>
                    <h2>Game Over! You hit yourself...</h2>
                    <button onClick={() => window.location.reload()}>Restart</button>
                </div>
            )}
    
            {!gameOver && (
                <div style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${fieldSize}, 30px)`,
                    gridTemplateRows: `repeat(${fieldSize}, 30px)`,
                    gap: "2px",
                    marginTop: "20px"
                }}>
                    {Array.from({ length: totalCells }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                width: "30px",
                                height: "30px",
                                backgroundColor: snakePositions.includes(index) ? "green" : 
                                                index === foodPosition ? "red" : "lightgray",
                                border: "1px solid #ccc"
                            }}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SnakePage;