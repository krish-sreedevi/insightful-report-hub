import { useState } from "react";
import { ReportCard, TimeRange } from "@/components/report/ReportCard";
import { SubjectTabs } from "@/components/report/SubjectTabs";
import { MonthlyProgressChart } from "@/components/report/MonthlyProgressChart";
import { TopicScoresSection } from "@/components/report/TopicScoresSection";
import { TimeSpentSection } from "@/components/report/TimeSpentSection";
import { DeepDiveSection } from "@/components/report/DeepDiveSection";

type Subject = "All" | "Math" | "Physics" | "English";

const Index = () => {
  const [progressSubject, setProgressSubject] = useState<Subject>("All");
  const [topicTimeRange, setTopicTimeRange] = useState<TimeRange>("Last 3 months");
  const [timeSpentRange, setTimeSpentRange] = useState<TimeRange>("Last 3 months");
  const [deepDiveRange, setDeepDiveRange] = useState<TimeRange>("Last 3 months");

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container py-8 space-y-6 max-w-4xl">
        {/* Section 1: Let's look at our time together */}
        <ReportCard title="Let's look at our last 3 months together" hideTimeFilter>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This report is designed to understand if we are progressing in the right direction
            </p>
            <SubjectTabs activeTab={progressSubject} onTabChange={setProgressSubject} />
            <MonthlyProgressChart activeSubject={progressSubject} />
          </div>
        </ReportCard>

        {/* Section 2: How are we doing? */}
        <ReportCard title="How are we doing?" onTimeRangeChange={setTopicTimeRange}>
          <TopicScoresSection timeRange={topicTimeRange} />
        </ReportCard>

        {/* Section 3: How are we spending time together */}
        <ReportCard title="How are we spending time together?" onTimeRangeChange={setTimeSpentRange}>
          <TimeSpentSection timeRange={timeSpentRange} />
        </ReportCard>

        {/* Section 4: Deep Dive! */}
        <ReportCard title="Deep Dive!" onTimeRangeChange={setDeepDiveRange}>
          <DeepDiveSection timeRange={deepDiveRange} />
        </ReportCard>

        {/* Footer Note */}
        <div className="text-center py-6">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Our AI Agent does not have access to any personal information about the student nor does it have access to session recordings. As a COPPA (Children's Online Privacy Protection Act) Compliant Company, your privacy is our priority!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
