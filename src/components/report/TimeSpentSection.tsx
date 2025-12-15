import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Sparkles } from "lucide-react";

const pieData = [
  { name: "Math", value: 62.5, color: "hsl(var(--math))" },
  { name: "Physics", value: 25, color: "hsl(var(--physics))" },
  { name: "English", value: 12.5, color: "hsl(var(--english))" },
];

const classStats = [
  { label: "15 Classes Used", color: "bg-math text-math-foreground" },
  { label: "9 Classes Missed", color: "bg-physics text-physics-foreground" },
  { label: "9 Classes Left", color: "bg-muted text-muted-foreground" },
];

export function TimeSpentSection() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Here we can see the utilization of the sessions available
      </p>
      
      {/* Class Stats Pills */}
      <div className="flex gap-2 flex-wrap">
        {classStats.map((stat) => (
          <div 
            key={stat.label}
            className={`${stat.color} text-sm font-medium px-4 py-2 rounded-lg`}
          >
            {stat.label}
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
        <div className="lg:w-72">
          <div className="bg-accent/50 rounded-xl p-5 relative">
            <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-math/60" />
            <Sparkles className="absolute top-10 -right-6 w-5 h-5 text-physics/80" />
            <p className="text-sm text-foreground leading-relaxed">
              We have spent the most amount of time on <span className="text-math font-semibold">Maths</span> (10 Sessions) and the least amount of time on <span className="text-english font-semibold">English</span> (2 sessions)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
