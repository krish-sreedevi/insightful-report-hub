import { ReportCard } from "@/components/report/ReportCard";
import { SubjectTabs } from "@/components/report/SubjectTabs";
import { ProgressChart } from "@/components/report/ProgressChart";
import { PerformanceTable } from "@/components/report/PerformanceTable";
import { TimeAllocationChart } from "@/components/report/TimeAllocationChart";
import { DeepDiveSection } from "@/components/report/DeepDiveSection";
import { FooterNote } from "@/components/report/FooterNote";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container py-4">
          <h1 className="text-2xl font-bold text-foreground">Student Progress Report</h1>
          <p className="text-sm text-muted-foreground mt-1">Academic Year 2024-2025</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* Let's look at our time together - Multiple variations */}
        <ReportCard title="Let's look at our time together">
          <div className="space-y-4">
            <SubjectTabs />
            <ProgressChart 
              description="The score is always visible and all the scores are improving in the right direction."
            />
          </div>
        </ReportCard>

        <ReportCard title="Let's look at our time together">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <SubjectTabs />
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-purple" />
                  <span className="text-muted-foreground">In 3 month</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-yellow" />
                  <span className="text-muted-foreground">All 3 months</span>
                </div>
              </div>
            </div>
            <ProgressChart 
              description="The score is always visible and all the scores are improving in the right direction."
            />
          </div>
        </ReportCard>

        {/* How are we doing */}
        <ReportCard title="How are we doing?">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              What do these figures say about her and where can we take her for the next level?
            </p>
            <SubjectTabs />
            <PerformanceTable />
          </div>
        </ReportCard>

        {/* Time Allocation */}
        <ReportCard title="How are we spending time together">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Let's see how much time we are taking for each subject and skills
            </p>
            <TimeAllocationChart />
          </div>
        </ReportCard>

        {/* Deep Dive */}
        <ReportCard title="Deep Dive!">
          <DeepDiveSection />
        </ReportCard>

        {/* Another Deep Dive */}
        <ReportCard title="Deep Dive!">
          <DeepDiveSection />
        </ReportCard>

        {/* Footer Note */}
        <FooterNote />
      </main>
    </div>
  );
};

export default Index;
