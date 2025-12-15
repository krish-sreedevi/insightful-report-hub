import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "1:1 Classes Solo", value: 45, color: "hsl(263, 70%, 55%)" },
  { name: "Classes Whiz", value: 35, color: "hsl(45, 100%, 60%)" },
  { name: "Classes Left", value: 20, color: "hsl(180, 60%, 45%)" },
];

export function TimeAllocationChart() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="flex gap-4 mb-4 flex-wrap">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="lg:w-64 bg-accent/50 rounded-lg p-4">
        <p className="text-sm text-foreground leading-relaxed">
          We have covered the same number of hours of 1:1 today & 2M hours in solo 
          tuition but this was distributed over a long period.
        </p>
      </div>
    </div>
  );
}
