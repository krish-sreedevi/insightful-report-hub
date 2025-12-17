import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AISparkle } from "./AISparkle";
import { SubjectTabs } from "./SubjectTabs";
import { Button } from "@/components/ui/button";
import { TimeRange } from "./ReportCard";

type Subject = "All" | "Math" | "Physics" | "English";

const pieDataByTimeRange: Record<TimeRange, { name: string; value: number; sessions: number; color: string }[]> = {
  "Last 3 months": [
    { name: "Math", value: 62.5, sessions: 10, color: "hsl(var(--math))" },
    { name: "Physics", value: 25, sessions: 4, color: "hsl(var(--physics))" },
    { name: "English", value: 12.5, sessions: 2, color: "hsl(var(--english))" },
  ],
  "Last 1 month": [
    { name: "Math", value: 50, sessions: 4, color: "hsl(var(--math))" },
    { name: "Physics", value: 33, sessions: 2, color: "hsl(var(--physics))" },
    { name: "English", value: 17, sessions: 1, color: "hsl(var(--english))" },
  ],
  "Last 1 week": [
    { name: "Math", value: 40, sessions: 2, color: "hsl(var(--math))" },
    { name: "Physics", value: 40, sessions: 2, color: "hsl(var(--physics))" },
    { name: "English", value: 20, sessions: 1, color: "hsl(var(--english))" },
  ],
};

// Subject-specific class data by time range
const subjectClassDataByTimeRange: Record<TimeRange, Record<string, { used: number; missed: number }>> = {
  "Last 3 months": {
    Math: { used: 15, missed: 2 },
    Physics: { used: 12, missed: 2 },
    English: { used: 10, missed: 2 },
  },
  "Last 1 month": {
    Math: { used: 5, missed: 1 },
    Physics: { used: 4, missed: 1 },
    English: { used: 3, missed: 0 },
  },
  "Last 1 week": {
    Math: { used: 2, missed: 0 },
    Physics: { used: 2, missed: 1 },
    English: { used: 1, missed: 0 },
  },
};

const classesLeft = 9; // Constant across all subjects

const getClassStats = (subject: Subject, timeRange: TimeRange) => {
  const gradients = {
    used: "linear-gradient(90deg, hsl(263 70% 55%) 0%, hsl(300 70% 55%) 50%, hsl(340 70% 55%) 100%)",
    missed: "linear-gradient(90deg, hsl(45 100% 55%) 0%, hsl(30 100% 55%) 50%, hsl(15 100% 55%) 100%)",
    left: "linear-gradient(90deg, hsl(142 70% 45%) 0%, hsl(180 70% 45%) 50%, hsl(200 70% 50%) 100%)",
  };

  const subjectClassData = subjectClassDataByTimeRange[timeRange];

  if (subject === "All") {
    const totalUsed = Object.values(subjectClassData).reduce((sum, d) => sum + d.used, 0);
    const totalMissed = Object.values(subjectClassData).reduce((sum, d) => sum + d.missed, 0);
    return [
      { label: "Classes Used", count: totalUsed, gradient: gradients.used },
      { label: "Classes Missed", count: totalMissed, gradient: gradients.missed },
      { label: "Classes Left", count: classesLeft, gradient: gradients.left },
    ];
  }

  const data = subjectClassData[subject];
  return [
    { label: "Classes Used", count: data.used, gradient: gradients.used },
    { label: "Classes Missed", count: data.missed, gradient: gradients.missed },
    { label: "Classes Left", count: classesLeft, gradient: gradients.left },
  ];
};

interface TimeSpentSectionProps {
  timeRange?: TimeRange;
}

export function TimeSpentSection({ timeRange = "Last 3 months" }: TimeSpentSectionProps) {
  const [activeSubject, setActiveSubject] = useState<Subject>("All");

  const pieData = pieDataByTimeRange[timeRange];
  const classStats = getClassStats(activeSubject, timeRange);
  const totalClasses = classStats.reduce((sum, stat) => sum + stat.count, 0);
  const usedClasses = classStats[0].count;
  const missedClasses = classStats[1].count;
  const utilizationRate = Math.round((usedClasses / (usedClasses + missedClasses + 0.001)) * 100);
  const totalSessions = pieData.reduce((sum, d) => sum + d.sessions, 0);

  const getSliceColor = (name: string) => {
    if (activeSubject === "All") {
      return pieData.find(d => d.name === name)?.color || "hsl(var(--muted))";
    }
    return name === activeSubject 
      ? pieData.find(d => d.name === name)?.color 
      : "hsl(var(--muted))";
  };

  const getInsight = () => {
    const mostTime = pieData.reduce((a, b) => a.sessions > b.sessions ? a : b);
    const leastTime = pieData.reduce((a, b) => a.sessions < b.sessions ? a : b);

    if (activeSubject === "All") {
      return (
        <>
          <span className={`text-${mostTime.name.toLowerCase()} font-semibold`}>{mostTime.name}</span> dominates with {mostTime.value}% of your time ({mostTime.sessions} sessions), 
          while <span className={`text-${leastTime.name.toLowerCase()} font-semibold`}>{leastTime.name}</span> receives only {leastTime.value}% ({leastTime.sessions} sessions). 
          With {missedClasses} missed classes ({100 - utilizationRate}% loss rate), consider redistributing time to balance your learning across all subjects.
        </>
      );
    }

    const subjectData = pieData.find(d => d.name === activeSubject);
    if (!subjectData) return null;

    const isHighest = subjectData.name === mostTime.name;
    const isLowest = subjectData.name === leastTime.name;

    if (isHighest) {
      return (
        <>
          <span className={`text-${activeSubject.toLowerCase()} font-semibold`}>{activeSubject}</span> is your most focused subject with {subjectData.sessions} sessions ({subjectData.value}% of total time). 
          You've attended {usedClasses} classes with only {missedClasses} missed. Keep up this excellent attendance!
        </>
      );
    }

    if (isLowest) {
      return (
        <>
          <span className={`text-${activeSubject.toLowerCase()} font-semibold`}>{activeSubject}</span> has received the least attention with only {subjectData.sessions} sessions ({subjectData.value}% of time). 
          Consider allocating more of your remaining {classesLeft} classes to {activeSubject} to improve balance.
        </>
      );
    }

    return (
      <>
        <span className={`text-${activeSubject.toLowerCase()} font-semibold`}>{activeSubject}</span> accounts for {subjectData.value}% of your learning time ({subjectData.sessions} sessions). 
        With {usedClasses} classes attended and {classesLeft} remaining, you're on track for steady progress.
      </>
    );
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
                  isAnimationActive={false}
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
              <AISparkle size="md" triggerKey={activeSubject} />
            </div>
            <div className="bg-accent/50 rounded-xl p-5">
              <p className="text-sm text-foreground leading-relaxed">
                {getInsight()}
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Tip: You have used 15 classes over 1 month and have only 9 remaining. Let's ensure that your learning remains uninterrupted.
            </p>
            <Button className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold px-6">
              Buy Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}