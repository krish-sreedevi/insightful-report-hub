import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AISparkle } from "./AISparkle";
import { SubjectTabs } from "./SubjectTabs";
import { Button } from "@/components/ui/button";

type Subject = "All" | "Math" | "Physics" | "English";

const pieData = [
  { name: "Math", value: 62.5, color: "hsl(var(--math))" },
  { name: "Physics", value: 25, color: "hsl(var(--physics))" },
  { name: "English", value: 12.5, color: "hsl(var(--english))" },
];

const classStats = [
  { label: "Classes Used", count: 15, gradient: "linear-gradient(90deg, hsl(263 70% 55%) 0%, hsl(300 70% 55%) 50%, hsl(340 70% 55%) 100%)" },
  { label: "Classes Missed", count: 9, gradient: "linear-gradient(90deg, hsl(45 100% 55%) 0%, hsl(30 100% 55%) 50%, hsl(15 100% 55%) 100%)" },
  { label: "Classes Left", count: 9, gradient: "linear-gradient(90deg, hsl(142 70% 45%) 0%, hsl(180 70% 45%) 50%, hsl(200 70% 50%) 100%)" },
];

const totalClasses = classStats.reduce((sum, stat) => sum + stat.count, 0);

export function TimeSpentSection() {
  const [activeSubject, setActiveSubject] = useState<Subject>("All");

  const getSliceColor = (name: string) => {
    if (activeSubject === "All") {
      return pieData.find(d => d.name === name)?.color || "hsl(var(--muted))";
    }
    return name === activeSubject 
      ? pieData.find(d => d.name === name)?.color 
      : "hsl(var(--muted))";
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Here we can see the utilization of the sessions available
      </p>

      <SubjectTabs activeTab={activeSubject} onTabChange={setActiveSubject} />
      
      {/* Stacked Progress Bar */}
      <div className="space-y-3">
        {/* Legend */}
        <div className="flex gap-4 flex-wrap">
          {classStats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ background: stat.gradient }}
              />
              <span className="text-sm font-bold text-foreground">
                {stat.count} {stat.label}
              </span>
            </div>
          ))}
        </div>
        
        <div className="h-4 bg-muted rounded-full overflow-hidden flex">
          {classStats.map((stat, idx) => (
            <div 
              key={stat.label}
              className="h-full transition-all duration-500"
              style={{ 
                width: `${(stat.count / totalClasses) * 100}%`,
                background: stat.gradient,
                borderRadius: idx === 0 ? '9999px 0 0 9999px' : idx === classStats.length - 1 ? '0 9999px 9999px 0' : '0'
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Pie Chart */}
        <div className="flex-1">
          <div className="h-80 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={110}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value, cx, cy, midAngle, outerRadius }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 25;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    const entry = pieData.find(d => d.name === name);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill={entry?.color || "hsl(var(--foreground))"}
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                        className="text-xs font-semibold"
                      >
                        {name} {value}%
                      </text>
                    );
                  }}
                  labelLine={{ stroke: "hsl(var(--muted-foreground))", strokeWidth: 1 }}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getSliceColor(entry.name)} 
                      style={{ transition: "fill 0.3s ease" }}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Insight Box */}
        <div className="lg:w-72 space-y-4">
          <div className="relative">
            <div className="absolute -top-3 -right-3 z-10">
              <AISparkle size="md" />
            </div>
            <div className="bg-accent/50 rounded-xl p-5">
              <p className="text-sm text-foreground leading-relaxed">
                We have spent the most amount of time on <span className="text-math font-semibold">Maths</span> (10 Sessions) and the least amount of time on <span className="text-english font-semibold">English</span> (2 sessions)
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              You have used 15 classes over 1 month and have only 9 remaining. Let's make sure that your learning is uninterrupted.
            </p>
            <Button className="bg-gradient-to-r from-math to-math/80 hover:from-math/90 hover:to-math/70 text-math-foreground font-semibold px-6">
              Buy Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}