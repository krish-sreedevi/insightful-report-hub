import { useState } from "react";

type Subject = "All" | "Math" | "Physics" | "English";

const subjects: Subject[] = ["All", "Math", "Physics", "English"];

const subjectLabels: Record<Subject, string> = {
  All: "All 82%",
  Math: "Math 80%",
  Physics: "Physics 87%",
  English: "English 74%",
};

const subjectStyles: Record<Subject, { active: string; inactive: string }> = {
  All: {
    active: "bg-foreground text-background",
    inactive: "bg-muted text-muted-foreground hover:bg-accent",
  },
  Math: {
    active: "bg-math text-math-foreground",
    inactive: "bg-math/10 text-math hover:bg-math/20",
  },
  Physics: {
    active: "bg-physics text-physics-foreground",
    inactive: "bg-physics/10 text-physics hover:bg-physics/20",
  },
  English: {
    active: "bg-english text-english-foreground",
    inactive: "bg-english/10 text-english hover:bg-english/20",
  },
};

interface SubjectTabsProps {
  activeTab?: Subject;
  onTabChange?: (tab: Subject) => void;
}

export function SubjectTabs({ activeTab: controlledTab, onTabChange }: SubjectTabsProps) {
  const [internalTab, setInternalTab] = useState<Subject>("All");
  const activeTab = controlledTab ?? internalTab;

  const handleTabChange = (tab: Subject) => {
    setInternalTab(tab);
    onTabChange?.(tab);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {subjects.map((subject) => (
        <button
          key={subject}
          onClick={() => handleTabChange(subject)}
          className={`tab-pill ${
            activeTab === subject 
              ? subjectStyles[subject].active 
              : subjectStyles[subject].inactive
          }`}
        >
          {subjectLabels[subject]}
        </button>
      ))}
    </div>
  );
}
