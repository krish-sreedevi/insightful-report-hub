import { ReportCard } from "@/components/report/ReportCard";
import { MonthlyProgressChart } from "@/components/report/MonthlyProgressChart";
import { TopicScoresSection } from "@/components/report/TopicScoresSection";
import { TimeSpentSection } from "@/components/report/TimeSpentSection";
import { DeepDiveSection } from "@/components/report/DeepDiveSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container py-8 space-y-6 max-w-4xl">
        {/* Section 1: Let's look at our time together */}
        <ReportCard title="Let's look at our time together">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This report is designed to understand if we are progressing in the right direction
            </p>
            <MonthlyProgressChart />
          </div>
        </ReportCard>

        {/* Section 2: How are we doing? */}
        <ReportCard title="How are we doing?">
          <TopicScoresSection />
        </ReportCard>

        {/* Section 3: How are we spending time together */}
        <ReportCard title="How are we spending time together">
          <TimeSpentSection />
        </ReportCard>

        {/* Section 4: Deep Dive! */}
        <ReportCard title="Deep Dive!">
          <DeepDiveSection />
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
