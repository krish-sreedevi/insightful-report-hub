import { useEffect, useState } from "react";
import aiSparkleIcon from "@/assets/ai-sparkle-icon.png";

interface AISparkleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  triggerKey?: string | number;
}

const sizeMap = {
  sm: 28,
  md: 40,
  lg: 52,
};

export function AISparkle({ className = "", size = "md", triggerKey }: AISparkleProps) {
  const dimension = sizeMap[size];
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (triggerKey !== undefined) {
      setIsBlinking(true);
      const timer = setTimeout(() => setIsBlinking(false), 600);
      return () => clearTimeout(timer);
    }
  }, [triggerKey]);
  
  return (
    <img 
      src={aiSparkleIcon}
      alt="AI Generated"
      className={`${className} ${isBlinking ? "animate-sparkle-blink" : ""}`}
      style={{ width: dimension, height: dimension }}
    />
  );
}
