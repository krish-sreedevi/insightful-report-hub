import aiSparkleIcon from "@/assets/ai-sparkle-icon.png";

interface AISparkleProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 28,
  md: 40,
  lg: 52,
};

export function AISparkle({ className = "", size = "md" }: AISparkleProps) {
  const dimension = sizeMap[size];
  
  return (
    <img 
      src={aiSparkleIcon}
      alt="AI Generated"
      className={className}
      style={{ width: dimension, height: dimension }}
    />
  );
}
