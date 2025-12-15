import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface ReportCardProps {
  title: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function ReportCard({ title, children, collapsible = true }: ReportCardProps) {
  return (
    <div className="bg-card rounded-lg card-shadow overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-lg font-bold text-foreground">{title}</h2>
        {collapsible && (
          <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Last 3 terms
            <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
