import aiSparkleIcon from "@/assets/ai-sparkle-icon.png";

interface AIIndicatorProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: 24,
  md: 36,
  lg: 48,
};

export function AIIndicator({ className = "", size = "md" }: AIIndicatorProps) {
  const dimension = sizeMap[size];
  
  return (
    <img 
      src={aiSparkleIcon}
      alt="AI Generated"
      className={`rounded-lg shadow-md ${className}`}
      style={{ width: dimension, height: dimension }}
    />
  );
}
