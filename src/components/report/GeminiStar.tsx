interface GeminiStarProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 20, height: 20 },
  md: { width: 32, height: 32 },
  lg: { width: 48, height: 48 },
};

export function GeminiStar({ className = "", size = "md" }: GeminiStarProps) {
  const { width, height } = sizeMap[size];
  
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="geminiGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(263 70% 55%)" />
          <stop offset="50%" stopColor="hsl(220 90% 60%)" />
          <stop offset="100%" stopColor="hsl(180 70% 50%)" />
        </linearGradient>
        <linearGradient id="geminiGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(340 70% 55%)" />
          <stop offset="50%" stopColor="hsl(300 70% 55%)" />
          <stop offset="100%" stopColor="hsl(263 70% 55%)" />
        </linearGradient>
      </defs>
      {/* Main 4-pointed star */}
      <path
        d="M24 4C24 4 26 16 26 20C30 20 42 22 42 24C42 24 30 26 26 26C26 30 24 44 24 44C24 44 22 30 22 26C18 26 6 24 6 24C6 24 18 22 22 20C22 16 24 4 24 4Z"
        fill="url(#geminiGradient1)"
        className="animate-pulse"
      />
      {/* Secondary smaller star - top right */}
      <path
        d="M38 8C38 8 39 12 39 13C40 13 44 14 44 14C44 14 40 15 39 15C39 16 38 20 38 20C38 20 37 16 37 15C36 15 32 14 32 14C32 14 36 13 37 13C37 12 38 8 38 8Z"
        fill="url(#geminiGradient2)"
        opacity="0.8"
      />
      {/* Tertiary tiny star - bottom left */}
      <path
        d="M12 32C12 32 12.5 34 12.5 34.5C13 34.5 15 35 15 35C15 35 13 35.5 12.5 35.5C12.5 36 12 38 12 38C12 38 11.5 36 11.5 35.5C11 35.5 9 35 9 35C9 35 11 34.5 11.5 34.5C11.5 34 12 32 12 32Z"
        fill="url(#geminiGradient1)"
        opacity="0.6"
      />
    </svg>
  );
}
