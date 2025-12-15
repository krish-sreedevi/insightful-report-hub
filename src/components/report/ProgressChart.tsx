import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { name: "Math", value: 85, color: "hsl(263, 70%, 55%)" },
  { name: "Physics", value: 72, color: "hsl(45, 100%, 60%)" },
  { name: "English", value: 68, color: "hsl(240, 5%, 75%)" },
];

interface ProgressChartProps {
  description?: string;
  insight?: string;
}

export function ProgressChart({ 
  description = "The score is always visible and all the scores are improving in the right direction.",
  insight = "The overall progress has been improving by 15% since last year.\n\nShe has been the best improver for 3 terms and has improved in every term by 15%."
}: ProgressChartProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 20 }}>
              <XAxis type="number" domain={[0, 100]} hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: 'hsl(240, 5%, 45%)' }}
                width={60}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 8, 8, 0]}
                barSize={28}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="lg:w-64 bg-accent/50 rounded-lg p-4">
        <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
          {insight}
        </p>
      </div>
    </div>
  );
}
