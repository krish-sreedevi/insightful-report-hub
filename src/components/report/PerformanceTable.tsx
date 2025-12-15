interface SkillRow {
  skill: string;
  score: string;
  trend: "up" | "down" | "stable";
}

const skillsData: SkillRow[] = [
  { skill: "All (Above Average)", score: "6.3/10", trend: "up" },
  { skill: "Attentiveness", score: "6.7", trend: "up" },
  { skill: "Engagement", score: "5.7", trend: "stable" },
  { skill: "Focus Score", score: "6.2", trend: "up" },
  { skill: "Understanding", score: "6.7", trend: "up" },
  { skill: "HTQ Questions Score", score: "7.0", trend: "up" },
  { skill: "BTQ Questions Score", score: "6.7", trend: "stable" },
];

export function PerformanceTable() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 font-semibold text-muted-foreground">Skill</th>
              <th className="text-center py-2 font-semibold text-muted-foreground">Math</th>
              <th className="text-center py-2 font-semibold text-muted-foreground">Physics</th>
              <th className="text-center py-2 font-semibold text-muted-foreground">English</th>
            </tr>
          </thead>
          <tbody>
            {skillsData.map((row, idx) => (
              <tr key={idx} className="border-b border-border/50">
                <td className="py-2.5 text-foreground">{row.skill}</td>
                <td className="py-2.5 text-center">
                  <span className={`inline-flex items-center gap-1 ${
                    row.trend === "up" ? "text-success" : 
                    row.trend === "down" ? "text-destructive" : 
                    "text-muted-foreground"
                  }`}>
                    {row.score}
                    {row.trend === "up" && <span className="text-xs">↑</span>}
                  </span>
                </td>
                <td className="py-2.5 text-center text-muted-foreground">{row.score}</td>
                <td className="py-2.5 text-center text-muted-foreground">{row.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lg:w-64 bg-accent/50 rounded-lg p-4">
        <p className="text-sm text-foreground leading-relaxed">
          The figures are improving and she is above average, which tells us she is 
          doing well. She could be asked to focus more on engagement in Physics.
        </p>
        <p className="text-sm text-muted-foreground mt-3">
          Subtitles needed here, for now we added dummy data
        </p>
      </div>
    </div>
  );
}
