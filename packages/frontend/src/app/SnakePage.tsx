import { useEffect, useState } from "react"
import { useFood, useGameOver } from "../shared/services/hooks/snake.hook"

const SnakePage = () => {
    const fieldSize = 10
    const totalCells = fieldSize * fieldSize

    const [snakePositions, setSnakePosition] = useState<number[]>([44])
    const [direction, setDirection] = useState<string>("RIGHT")

    const {foodPosition, setFoodPosition, generateFoodPosition} = useFood(totalCells, snakePositions)
    const {gameOver, setGameOver} = useGameOver()

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP")
        if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
        if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
        if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    }

    const moveSnake = () => {
        const head = snakePositions[0]
        let newHead = head
        
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
            setGameOver(true)
            return
        }

        const newSnake = [newHead, ...snakePositions]

        if (newHead === foodPosition) {
            setFoodPosition(generateFoodPosition())
        } else {
            newSnake.pop()
        }

        setSnakePosition(newSnake)
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress)
        const interval = setInterval(moveSnake, 300)

        return () => {
            window.removeEventListener("keydown", handleKeyPress)
            clearInterval(interval)
        }
    }, [direction, snakePositions])

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