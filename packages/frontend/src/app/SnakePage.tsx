import { useState } from "react"
import { useFood, useGameOver, useKeyPress, useSnakeMovement } from "../shared/services/hooks/snake.hook"
import { FIELD_SIZE, TOTAL_CELLS } from "../shared/constants/snake-page.constant"

const SnakePage = () => {
    const [snakePositions, setSnakePosition] = useState<number[]>([44])
    const [direction, setDirection] = useState<string>("RIGHT")

    const {foodPosition, setFoodPosition, generateFoodPosition} = useFood(snakePositions)
    const {gameOver, setGameOver} = useGameOver()

    useKeyPress(setDirection);

    useSnakeMovement(
        snakePositions, 
        direction, 
        setSnakePosition, 
        setGameOver, 
        foodPosition, 
        setFoodPosition, 
        generateFoodPosition,
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
                    gridTemplateColumns: `repeat(${FIELD_SIZE}, 30px)`,
                    gridTemplateRows: `repeat(${FIELD_SIZE}, 30px)`,
                    gap: "2px",
                    marginTop: "20px"
                }}>
                    {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
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