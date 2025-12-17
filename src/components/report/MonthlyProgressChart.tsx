import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import { AISparkle } from "./AISparkle";

const data = [
  { month: "Jan", Math: 45, Physics: 40, English: 35 },
  { month: "Feb", Math: 65, Physics: 55, English: 50 },
  { month: "March", Math: 85, Physics: 72, English: 68 },
];

// Calculate improvements
const subjects = ["Math", "Physics", "English"] as const;
const improvements = subjects.map(subject => ({
  name: subject,
  start: data[0][subject],
  end: data[data.length - 1][subject],
  total: data[data.length - 1][subject] - data[0][subject],
  monthly: Math.round((data[data.length - 1][subject] - data[0][subject]) / (data.length - 1)),
  current: data[data.length - 1][subject],
}));

const bestImprovement = improvements.reduce((a, b) => a.total > b.total ? a : b);
const leastImprovement = improvements.reduce((a, b) => a.total < b.total ? a : b);
const avgImprovement = Math.round(improvements.reduce((sum, i) => sum + i.total, 0) / improvements.length);

interface MonthlyProgressChartProps {
  activeSubject?: "All" | "Math" | "Physics" | "English";
}

export function MonthlyProgressChart({ activeSubject = "All" }: MonthlyProgressChartProps) {
  const showMath = activeSubject === "All" || activeSubject === "Math";
  const showPhysics = activeSubject === "All" || activeSubject === "Physics";
  const showEnglish = activeSubject === "All" || activeSubject === "English";

  const getInsight = () => {
    if (activeSubject === "All") {
      return (
        <>
          <p className="text-sm font-semibold text-foreground mb-2">
            Strong upward trend across all subjects with +{avgImprovement}% average growth
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="text-math font-semibold">Math</span> leads with +{bestImprovement.total}% improvement (now at {bestImprovement.current}%), 
            while <span className="text-physics font-semibold">Physics</span> grew +{leastImprovement.total}%. 
            To maintain momentum, prioritize <span className="text-physics font-semibold">Physics</span> sessions next month to close the gap.
          </p>
        </>
      );
    }

    const subjectData = improvements.find(i => i.name === activeSubject);
    if (!subjectData) return null;

    const isBest = subjectData.name === bestImprovement.name;
    const isWorst = subjectData.name === leastImprovement.name;
    const targetScore = Math.min(100, subjectData.current + subjectData.monthly);

    if (isBest) {
      return (
        <>
          <p className="text-sm font-semibold text-foreground mb-2">
            <span className={`text-${activeSubject.toLowerCase()}`}>{activeSubject}</span> is your fastest-growing subject!
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            With +{subjectData.total}% growth over 3 months ({subjectData.start}% → {subjectData.current}%), 
            you're averaging +{subjectData.monthly}% monthly. At this rate, you could reach {targetScore}% next month. 
            Keep this momentum going!
          </p>
        </>
      );
    }

    if (isWorst) {
      return (
        <>
          <p className="text-sm font-semibold text-foreground mb-2">
            <span className={`text-${activeSubject.toLowerCase()}`}>{activeSubject}</span> needs more attention
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Growing at +{subjectData.monthly}% monthly ({subjectData.start}% → {subjectData.current}%), 
            this is {bestImprovement.total - subjectData.total}% behind your best subject. 
            <strong> Action:</strong> Schedule 2 extra {activeSubject} sessions next month to accelerate progress.
          </p>
        </>
      );
    }

    return (
      <>
        <p className="text-sm font-semibold text-foreground mb-2">
          Steady progress in <span className={`text-${activeSubject.toLowerCase()}`}>{activeSubject}</span>
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          You've improved +{subjectData.total}% over 3 months ({subjectData.start}% → {subjectData.current}%), 
          averaging +{subjectData.monthly}% monthly. Consistent effort here will help you reach {targetScore}% by next month.
        </p>
      </>
    );
  };

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
              {showMath && (
                <Bar dataKey="Math" fill="hsl(var(--math))" radius={[4, 4, 0, 0]} barSize={24} />
              )}
              {showPhysics && (
                <Bar dataKey="Physics" fill="hsl(var(--physics))" radius={[4, 4, 0, 0]} barSize={24} />
              )}
              {showEnglish && (
                <Bar dataKey="English" fill="hsl(var(--english))" radius={[4, 4, 0, 0]} barSize={24} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="lg:w-72 relative">
        <div className="absolute -top-3 -right-3 z-10">
          <AISparkle size="md" />
        </div>
        <div className="bg-accent/50 rounded-xl p-5">
          {getInsight()}
        </div>
      </div>
    </div>
  );
}
