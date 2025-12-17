import { useState } from "react";
import { SubjectTabs } from "./SubjectTabs";
import { AISparkle } from "./AISparkle";
import { Button } from "@/components/ui/button";

type Subject = "All" | "Math" | "Physics" | "English";

interface Topic {
  rank: number;
  name: string;
  subject: "Math" | "Physics" | "English";
  score: number;
}

const allTopics: Topic[] = [
  // High scoring topics
  { rank: 1, name: "Quadratic Equations", subject: "Math", score: 92 },
  { rank: 2, name: "Newton's Laws of Motion", subject: "Physics", score: 90 },
  { rank: 3, name: "Linear Algebra", subject: "Math", score: 88 },
  { rank: 4, name: "Shakespeare Analysis", subject: "English", score: 87 },
  { rank: 5, name: "Thermodynamics", subject: "Physics", score: 85 },
  { rank: 6, name: "Essay Writing", subject: "English", score: 82 },
  // Low scoring topics
  { rank: 7, name: "Wave Mechanics", subject: "Physics", score: 45 },
  { rank: 8, name: "Poetry Interpretation", subject: "English", score: 38 },
  { rank: 9, name: "Calculus Integration", subject: "Math", score: 32 },
  { rank: 10, name: "Trigonometry", subject: "Math", score: 28 },
  { rank: 11, name: "Electromagnetic Fields", subject: "Physics", score: 25 },
  { rank: 12, name: "Grammar & Syntax", subject: "English", score: 22 },
];

const subjectColors: Record<string, string> = {
  Math: "bg-math text-math-foreground",
  Physics: "bg-physics text-physics-foreground",
  English: "bg-english text-english-foreground",
};

function TopicRow({ topic }: { topic: Topic }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-sm text-muted-foreground w-6">#{topic.rank}</span>
      <span className="text-sm text-foreground flex-1">{topic.name}</span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${subjectColors[topic.subject]}`}>
        {topic.subject}
      </span>
      <span className="text-sm font-semibold text-foreground w-12 text-right">{topic.score}%</span>
    </div>
  );
}

export function TopicScoresSection() {
  const [activeSubject, setActiveSubject] = useState<Subject>("All");
  
  const filteredTopics = activeSubject === "All" 
    ? allTopics 
    : allTopics.filter(t => t.subject === activeSubject);
  
  const sortedByScore = [...filteredTopics].sort((a, b) => b.score - a.score);
  const highestTopics = sortedByScore.slice(0, 3);
  const lowestTopics = sortedByScore.slice(-3).reverse();

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        We will know where we are doing well and where we need to spend more time on
      </p>
      <SubjectTabs activeTab={activeSubject} onTabChange={setActiveSubject} />
      
      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        <div className="flex-1 space-y-4">
          {/* Highest Scoring Topics */}
          <div>
            <h4 className="text-sm font-semibold text-foreground underline mb-2">3 Highest Scoring Topics:</h4>
            <div className="space-y-1">
              {highestTopics.map((topic) => (
                <TopicRow key={topic.name} topic={topic} />
              ))}
            </div>
          </div>
          
          {/* Lowest Scoring Topics */}
          <div>
            <h4 className="text-sm font-semibold text-foreground underline mb-2">3 Lowest Scoring Topics:</h4>
            <div className="space-y-1">
              {lowestTopics.map((topic) => (
                <TopicRow key={topic.name} topic={topic} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-72 space-y-4">
          <div className="relative">
            <div className="absolute -top-3 -right-3 z-10">
              <AISparkle size="md" />
            </div>
            <div className="bg-accent/50 rounded-xl p-5">
              <p className="text-sm text-foreground leading-relaxed">
                The highest scoring topic and the least scoring topic are both from <span className="text-math font-semibold">Math</span>. <span className="text-physics font-semibold">Physics</span> seems to be strong on the topics that have been completed but <span className="text-math font-semibold">Math</span> is both good and bad.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Schedule a session now to improve the lower scoring topics:
            </p>
            <Button className="bg-gradient-to-r from-math to-math/80 hover:from-math/90 hover:to-math/70 text-math-foreground font-semibold px-6">
              Schedule Now!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
