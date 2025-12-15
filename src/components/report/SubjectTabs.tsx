import { useState } from "react";

const subjects = ["All", "Math", "Physics", "English"];

interface SubjectTabsProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function SubjectTabs({ activeTab: controlledTab, onTabChange }: SubjectTabsProps) {
  const [internalTab, setInternalTab] = useState("All");
  const activeTab = controlledTab ?? internalTab;

  const handleTabChange = (tab: string) => {
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
            activeTab === subject ? "tab-pill-active" : "tab-pill-inactive"
          }`}
        >
          {subject}
        </button>
      ))}
    </div>
  );
}
