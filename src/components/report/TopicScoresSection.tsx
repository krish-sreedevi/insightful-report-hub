import { useState } from "react";
import { SubjectTabs } from "./SubjectTabs";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Subject = "All" | "Math" | "Physics" | "English";

interface Topic {
  rank: number;
  name: string;
  subject: "Math" | "Physics" | "English";
  score: number;
}

const highestTopics: Topic[] = [
  { rank: 1, name: "<Topic Name>", subject: "Math", score: 90 },
  { rank: 2, name: "<Topic Name>", subject: "Physics", score: 87 },
  { rank: 3, name: "<Topic Name>", subject: "Math", score: 85 },
];

const lowestTopics: Topic[] = [
  { rank: 10, name: "<Topic Name>", subject: "Math", score: 25 },
  { rank: 11, name: "<Topic Name>", subject: "Math", score: 24 },
  { rank: 12, name: "<Topic Name>", subject: "Math", score: 21 },
];

const subjectColors: Record<string, string> = {
  Math: "bg-math text-math-foreground",
  Physics: "bg-physics text-physics-foreground",
  English: "bg-english text-english-foreground",
};

function TopicRow({ topic, overrideSubject }: { topic: Topic; overrideSubject?: "Math" | "Physics" | "English" }) {
  const displaySubject = overrideSubject || topic.subject;
  
  return (
    <div className="flex items-center gap-3 py-2">
      <span className="text-sm text-muted-foreground w-6">#{topic.rank}</span>
      <span className="text-sm text-foreground flex-1">{topic.name}</span>
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${subjectColors[displaySubject]}`}>
        {displaySubject}
      </span>
      <span className="text-sm font-semibold text-foreground w-12 text-right">{topic.score}%</span>
    </div>
  );
}

export function TopicScoresSection() {
  const [activeSubject, setActiveSubject] = useState<Subject>("All");
  
  const overrideSubject = activeSubject === "All" ? undefined : activeSubject;

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
                <TopicRow key={topic.rank} topic={topic} overrideSubject={overrideSubject} />
              ))}
            </div>
          </div>
          
          {/* Lowest Scoring Topics */}
          <div>
            <h4 className="text-sm font-semibold text-foreground underline mb-2">3 Lowest Scoring Topics:</h4>
            <div className="space-y-1">
              {lowestTopics.map((topic) => (
                <TopicRow key={topic.rank} topic={topic} overrideSubject={overrideSubject} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:w-72 space-y-4">
          <div className="bg-accent/50 rounded-xl p-5 relative">
            <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-math/60" />
            <Sparkles className="absolute top-12 -right-6 w-5 h-5 text-physics/80" />
            <p className="text-sm text-foreground leading-relaxed">
              The highest scoring topic and the least scoring topic are both from <span className="text-math font-semibold">Math</span>. <span className="text-physics font-semibold">Physics</span> seems to be strong on the topics that have been completed but <span className="text-math font-semibold">Math</span> is both good and bad.
            </p>
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
