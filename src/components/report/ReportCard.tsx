import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ReportCardProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "dark";
}

export function ReportCard({ title, children, variant = "default" }: ReportCardProps) {
  const isDark = variant === "dark";
  
  return (
    <div className={`rounded-2xl card-shadow overflow-hidden animate-fade-in ${
      isDark ? "bg-foreground text-background" : "bg-card"
    }`}>
      <div className={`flex items-center justify-between px-6 py-4 ${
        isDark ? "border-b border-background/10" : "border-b border-border"
      }`}>
        <h2 className={`text-xl font-bold ${isDark ? "text-background" : "text-foreground"}`}>
          {title}
        </h2>
        <button className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
          isDark 
            ? "bg-background/10 text-background hover:bg-background/20" 
            : "bg-muted text-muted-foreground hover:bg-accent"
        }`}>
          Last 3 months
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
