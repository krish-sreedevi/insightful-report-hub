import { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

type TimeRange = "Last 1 week" | "Last 1 month" | "Last 3 months";

const timeRangeOptions: TimeRange[] = ["Last 1 week", "Last 1 month", "Last 3 months"];

interface ReportCardProps {
  title: string;
  children: ReactNode;
  onTimeRangeChange?: (range: TimeRange) => void;
}

export function ReportCard({ title, children, onTimeRangeChange }: ReportCardProps) {
  const [selectedRange, setSelectedRange] = useState<TimeRange>("Last 3 months");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (range: TimeRange) => {
    setSelectedRange(range);
    setIsOpen(false);
    onTimeRangeChange?.(range);
  };

  return (
    <div className="bg-card rounded-2xl card-shadow overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border">
        <h2 
          className="text-xl font-bold bg-gradient-to-r from-[hsl(263,70%,55%)] via-[hsl(220,90%,55%)] to-[hsl(180,70%,45%)] bg-clip-text text-transparent"
        >
          {title}
        </h2>
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-colors bg-muted text-muted-foreground hover:bg-accent"
          >
            {selectedRange}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
          
          {isOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsOpen(false)} 
              />
              <div className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded-lg shadow-lg min-w-[160px] overflow-hidden">
                {timeRangeOptions.map((range) => (
                  <button
                    key={range}
                    onClick={() => handleSelect(range)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-accent ${
                      selectedRange === range 
                        ? "bg-accent font-medium text-foreground" 
                        : "text-muted-foreground"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
