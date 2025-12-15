import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AISparkle } from "./AISparkle";

const pieData = [
  { name: "Math", value: 62.5, color: "hsl(var(--math))" },
  { name: "Physics", value: 25, color: "hsl(var(--physics))" },
  { name: "English", value: 12.5, color: "hsl(var(--english))" },
];

const totalClasses = 33;
const classStats = [
  { label: "15/33 Classes Used", value: (15 / totalClasses) * 100, gradient: "linear-gradient(90deg, hsl(263 70% 55%) 0%, hsl(300 70% 55%) 50%, hsl(340 70% 55%) 100%)" },
  { label: "9/33 Classes Missed", value: (9 / totalClasses) * 100, gradient: "linear-gradient(90deg, hsl(45 100% 55%) 0%, hsl(30 100% 55%) 50%, hsl(15 100% 55%) 100%)" },
  { label: "9/33 Classes Left", value: (9 / totalClasses) * 100, gradient: "linear-gradient(90deg, hsl(142 70% 45%) 0%, hsl(180 70% 45%) 50%, hsl(200 70% 50%) 100%)" },
];

export function TimeSpentSection() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Here we can see the utilization of the sessions available
      </p>
      
      {/* Class Stats Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classStats.map((stat) => (
          <div key={stat.label} className="space-y-2">
            <span className="text-sm font-bold text-foreground">{stat.label}</span>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${stat.value}%`,
                  background: stat.gradient
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Pie Chart */}
        <div className="flex-1">
          <div className="h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name}\n${value}%`}
                  labelLine={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Insight Box */}
        <div className="lg:w-72 relative">
          <div className="absolute -top-3 -right-3 z-10">
            <AISparkle size="md" />
          </div>
          <div className="bg-accent/50 rounded-xl p-5">
            <p className="text-sm text-foreground leading-relaxed">
              We have spent the most amount of time on <span className="text-math font-semibold">Maths</span> (10 Sessions) and the least amount of time on <span className="text-english font-semibold">English</span> (2 sessions)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
