import { useEffect } from "react";

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
