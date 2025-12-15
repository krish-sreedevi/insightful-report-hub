import { useState } from "react";
import { Info, Sparkles } from "lucide-react";

type Subject = "Math" | "Physics" | "English";

const subjects: Subject[] = ["Math", "Physics", "English"];

const subjectStyles: Record<Subject, { active: string; inactive: string }> = {
  Math: {
    active: "bg-math text-math-foreground",
    inactive: "bg-math/10 text-math hover:bg-math/20",
  },
  Physics: {
    active: "bg-physics text-physics-foreground",
    inactive: "bg-physics/10 text-physics-foreground hover:bg-physics/20",
  },
  English: {
    active: "bg-english text-english-foreground",
    inactive: "bg-english/10 text-english hover:bg-english/20",
  },
};

const progressBars = [
  { 
    label: "15/17 Classes Attended", 
    value: 88, 
    gradient: "linear-gradient(90deg, hsl(263 70% 55%) 0%, hsl(300 70% 55%) 50%, hsl(340 70% 55%) 100%)" 
  },
  { 
    label: "78% (7.8 GPA/B+)", 
    value: 78, 
    gradient: "linear-gradient(90deg, hsl(45 100% 55%) 0%, hsl(30 100% 55%) 50%, hsl(15 100% 55%) 100%)" 
  },
  { 
    label: "9/12 Topics Covered", 
    value: 75, 
    gradient: "linear-gradient(90deg, hsl(142 70% 45%) 0%, hsl(180 70% 45%) 50%, hsl(200 70% 50%) 100%)" 
  },
];

const strengths = [
  "Demonstrates strong conceptual understanding when topics are explained thoroughly",
  "Actively participates in sessions and asks pertinent clarifying questions",
  "Shows good problem-solving abilities once concepts are grasped",
  "Performs well with guided practice and structured support",
];

const improvements = [
  "Demonstrates strong conceptual understanding when topics are explained thoroughly",
  "Actively participates in sessions and asks pertinent clarifying questions",
  "Shows good problem-solving abilities once concepts are grasped",
  "Performs well with guided practice and structured support",
];

const recommendations = [
  "Create formula reference sheets and practice daily memorization exercises",
  "Increase independent practice problems after each concept introduction",
  "Focus on real-world application problems to bridge theory-practice gap",
  "Schedule regular review sessions for previously covered topics to ensure retention",
];

export function DeepDiveSection() {
  const [activeSubject, setActiveSubject] = useState<Subject>("Math");

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        A deeper look at each subject and the analysis of the feedback from our expert tutors!
      </p>

      {/* Subject Tabs */}
      <div className="flex gap-2 flex-wrap">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setActiveSubject(subject)}
            className={`tab-pill ${
              activeSubject === subject 
                ? subjectStyles[subject].active 
                : subjectStyles[subject].inactive
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Progress Bars with AI Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {progressBars.map((bar, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">{bar.label}</span>
              <Info className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500"
                style={{ 
                  width: `${bar.value}%`,
                  background: bar.gradient
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Strengths and To Improve */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border border-border rounded-xl p-5">
          <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
            Strengths:
            <Sparkles className="w-4 h-4 text-math" />
          </h4>
          <ul className="space-y-3">
            {strengths.map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-math">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-border rounded-xl p-5">
          <h4 className="font-bold text-foreground mb-4">To Improve:</h4>
          <ul className="space-y-3">
            {improvements.map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-physics">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="relative">
        <Sparkles className="absolute -top-2 right-4 w-6 h-6 text-math/60" />
        <Sparkles className="absolute top-8 -right-2 w-4 h-4 text-physics/80" />
        <div className="border border-border rounded-xl p-5">
          <h4 className="font-bold text-foreground mb-4">Recommendations:</h4>
          <ul className="space-y-2">
            {recommendations.map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-math font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
