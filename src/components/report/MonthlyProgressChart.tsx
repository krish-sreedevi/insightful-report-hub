import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { Sparkles } from "lucide-react";

const data = [
  { month: "Jan", Math: 45, Physics: 40, English: 35 },
  { month: "Feb", Math: 65, Physics: 55, English: 50 },
  { month: "March", Math: 85, Physics: 72, English: 68 },
];

export function MonthlyProgressChart() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Bar dataKey="Math" fill="hsl(var(--math))" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="Physics" fill="hsl(var(--physics))" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="English" fill="hsl(var(--english))" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="lg:w-72 relative">
        <div className="bg-accent/50 rounded-xl p-5 relative">
          <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-math/60" />
          <Sparkles className="absolute top-8 -right-6 w-5 h-5 text-physics/80" />
          <p className="text-sm font-semibold text-foreground mb-2">
            The student's progress has been improving month on month
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            We have seen the most improvement in <span className="text-math font-semibold">Math</span> and the least improvement in <span className="text-physics font-semibold">Physics</span>
          </p>
        </div>
      </div>
    </div>
  );
}
