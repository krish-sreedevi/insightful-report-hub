interface AIIndicatorProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 36, height: 36 },
  lg: { width: 48, height: 48 },
};

export function AIIndicator({ className = "", size = "md" }: AIIndicatorProps) {
  const { width, height } = sizeMap[size];
  
  return (
    <div 
      className={`relative ${className}`}
      style={{ width, height }}
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full blur-md opacity-60 animate-pulse"
        style={{
          background: "linear-gradient(135deg, hsl(263 70% 55%), hsl(220 90% 55%), hsl(180 70% 45%))"
        }}
      />
      {/* Inner orb */}
      <div 
        className="absolute inset-1 rounded-full"
        style={{
          background: "linear-gradient(135deg, hsl(263 70% 60%), hsl(220 90% 60%), hsl(180 70% 50%))"
        }}
      />
      {/* Shine effect */}
      <div 
        className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-white/60"
      />
      {/* AI text or icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className="text-white font-bold drop-shadow-sm"
          style={{ fontSize: width * 0.3 }}
        >
          AI
        </span>
      </div>
    </div>
  );
}
