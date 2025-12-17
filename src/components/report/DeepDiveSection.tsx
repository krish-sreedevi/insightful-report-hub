import { useState } from "react";
import { Info } from "lucide-react";
import { AISparkle } from "./AISparkle";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimeRange } from "./ReportCard";

type Subject = "Math" | "Physics" | "English";

const subjects: Subject[] = ["Math", "Physics", "English"];

const subjectLabelsByTimeRange: Record<TimeRange, Record<Subject, string>> = {
  "Last 3 months": {
    Math: "Math 80%",
    Physics: "Physics 87%",
    English: "English 74%",
  },
  "Last 1 month": {
    Math: "Math 75%",
    Physics: "Physics 82%",
    English: "English 70%",
  },
  "Last 1 week": {
    Math: "Math 68%",
    Physics: "Physics 75%",
    English: "English 65%",
  },
};

const subjectStyles: Record<Subject, { active: string; inactive: string }> = {
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

type SubjectDataType = {
  progressBars: { label: string; value: number; gradient: string; tooltip: { content: React.ReactNode } }[];
  strengths: string[];
  improvements: string[];
  recommendations: string[];
};

const createTooltip = (type: "classes" | "grade" | "topics", topics?: string[]) => {
  if (type === "classes") {
    return (
      <div className="space-y-3">
        <p className="text-sm">
          <span className="font-semibold">Classes Attended=</span> Where tutor and students were able to spend time together
        </p>
        <p className="text-sm">
          <span className="font-semibold">Total Number of Class=</span> Classes that have been scheduled
        </p>
      </div>
    );
  }
  if (type === "grade") {
    return (
      <div className="space-y-2">
        <p className="font-semibold text-sm">Grade Score Table:</p>
        <div className="text-sm space-y-1">
          <p>9.1 - 10 → A+</p>
          <p>8.1 - 9 → A</p>
          <p>7.1 - 8 → B+</p>
          <p>6.1 - 7 → B</p>
          <p>5.1 - 6 → C</p>
          <p>4.1 - 5 → D</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-2">
      <p className="font-semibold text-sm">Topics Covered:</p>
      <ul className="text-sm space-y-1">
        {topics?.map((topic, i) => <li key={i}>• {topic}</li>)}
      </ul>
    </div>
  );
};

const gradients = {
  classes: "linear-gradient(90deg, hsl(263 70% 55%) 0%, hsl(300 70% 55%) 50%, hsl(340 70% 55%) 100%)",
  grade: "linear-gradient(90deg, hsl(45 100% 55%) 0%, hsl(30 100% 55%) 50%, hsl(15 100% 55%) 100%)",
  topics: "linear-gradient(90deg, hsl(142 70% 45%) 0%, hsl(180 70% 45%) 50%, hsl(200 70% 50%) 100%)",
};

const subjectDataByTimeRange: Record<TimeRange, Record<Subject, SubjectDataType>> = {
  "Last 3 months": {
    Math: {
      progressBars: [
        { label: "15/17 Classes Attended", value: 88, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "80% (8.0 GPA/B+)", value: 80, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "9/12 Topics Covered", value: 75, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Quadratic Equations & Factoring", "Linear Algebra fundamentals", "Trigonometric functions", "Calculus Introduction"]) } },
      ],
      strengths: [
        "Excels at solving complex algebraic equations with multiple variables",
        "Strong logical reasoning skills when approaching word problems",
        "Quick to grasp new mathematical concepts during explanations",
        "Shows excellent work organization and step-by-step problem solving",
      ],
      improvements: [
        "Needs more practice with trigonometric identities and applications",
        "Sometimes rushes through calculations leading to arithmetic errors",
        "Could benefit from memorizing key formulas more thoroughly",
        "Integration concepts require additional reinforcement",
      ],
      recommendations: [
        "Practice 10 calculus problems daily focusing on integration techniques",
        "Create flashcards for trigonometric identities and review before each session",
        "Double-check all calculations before moving to the next step",
        "Work on real-world application problems to strengthen conceptual understanding",
      ],
    },
    Physics: {
      progressBars: [
        { label: "12/14 Classes Attended", value: 86, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "87% (8.7 GPA/A)", value: 87, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "8/10 Topics Covered", value: 80, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Newton's Laws of Motion", "Thermodynamics principles", "Wave mechanics basics", "Electromagnetic theory"]) } },
      ],
      strengths: [
        "Excellent understanding of Newton's Laws and their real-world applications",
        "Strong visualization skills for complex physics scenarios",
        "Asks insightful questions that demonstrate deep curiosity",
        "Performs exceptionally well in lab-based problem solving",
      ],
      improvements: [
        "Electromagnetic field calculations need more focused practice",
        "Wave mechanics concepts, especially interference patterns, require reinforcement",
        "Could improve speed in unit conversions during problem solving",
        "Needs to strengthen understanding of energy conservation in complex systems",
      ],
      recommendations: [
        "Watch video demonstrations of electromagnetic experiments to build intuition",
        "Practice wave superposition problems with varying difficulty levels",
        "Create a quick-reference sheet for common unit conversions",
        "Solve 5 energy conservation problems daily using different scenarios",
      ],
    },
    English: {
      progressBars: [
        { label: "10/12 Classes Attended", value: 83, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "74% (7.4 GPA/B+)", value: 74, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "7/10 Topics Covered", value: 70, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Shakespeare Analysis", "Essay Writing Structure", "Poetry Interpretation", "Grammar & Syntax fundamentals"]) } },
      ],
      strengths: [
        "Creative and original ideas in essay writing assignments",
        "Strong reading comprehension and ability to identify themes",
        "Excellent vocabulary usage and word choice in compositions",
        "Shows genuine interest in literary analysis discussions",
      ],
      improvements: [
        "Grammar and syntax rules need consistent reinforcement",
        "Essay structure could be more organized with clearer transitions",
        "Poetry interpretation skills require more depth and analysis",
        "Needs to work on citing evidence more effectively in arguments",
      ],
      recommendations: [
        "Complete daily grammar exercises focusing on punctuation and sentence structure",
        "Practice writing essay outlines before drafting to improve organization",
        "Read and annotate one poem per week, focusing on literary devices",
        "Use the PEEL method (Point, Evidence, Explain, Link) for all written responses",
      ],
    },
  },
  "Last 1 month": {
    Math: {
      progressBars: [
        { label: "5/6 Classes Attended", value: 83, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "75% (7.5 GPA/B+)", value: 75, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "3/4 Topics Covered", value: 75, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Linear Algebra review", "Trigonometric applications", "Calculus derivatives"]) } },
      ],
      strengths: [
        "Improved consistency in solving derivative problems",
        "Better attention to detail in calculations this month",
        "Actively participates in problem-solving discussions",
      ],
      improvements: [
        "Still struggling with complex trigonometric identities",
        "Needs to work on time management during tests",
        "Integration techniques require more practice",
      ],
      recommendations: [
        "Focus on 5 trigonometry problems daily",
        "Practice timed problem sets to improve speed",
        "Review integration rules before each session",
      ],
    },
    Physics: {
      progressBars: [
        { label: "4/5 Classes Attended", value: 80, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "82% (8.2 GPA/A)", value: 82, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "3/4 Topics Covered", value: 75, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Electromagnetic waves", "Light & optics", "Circuit analysis"]) } },
      ],
      strengths: [
        "Excellent grasp of electromagnetic wave concepts",
        "Strong problem-solving in circuit analysis",
        "Good retention of previously learned concepts",
      ],
      improvements: [
        "Optics calculations need more precision",
        "Should practice more complex circuit diagrams",
        "Wave interference problems still challenging",
      ],
      recommendations: [
        "Complete optics practice worksheets daily",
        "Draw circuit diagrams before solving problems",
        "Review wave interference examples before class",
      ],
    },
    English: {
      progressBars: [
        { label: "3/4 Classes Attended", value: 75, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "70% (7.0 GPA/B)", value: 70, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "2/3 Topics Covered", value: 67, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Essay structure revision", "Poetry analysis techniques"]) } },
      ],
      strengths: [
        "Improved essay introduction writing",
        "Better vocabulary usage in recent essays",
        "More engaged in class discussions",
      ],
      improvements: [
        "Conclusion paragraphs still need work",
        "Poetry meter and rhythm analysis is weak",
        "Grammar errors persist in complex sentences",
      ],
      recommendations: [
        "Practice writing 3 essay conclusions per week",
        "Analyze one poem's rhythm and meter daily",
        "Complete grammar exercises focusing on complex sentences",
      ],
    },
  },
  "Last 1 week": {
    Math: {
      progressBars: [
        { label: "2/2 Classes Attended", value: 100, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "68% (6.8 GPA/B)", value: 68, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "1/2 Topics Covered", value: 50, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Integration by parts"]) } },
      ],
      strengths: [
        "Perfect attendance this week",
        "Showed improvement in basic integration",
      ],
      improvements: [
        "Struggled with integration by parts concept",
        "Needs to review fundamental formulas",
      ],
      recommendations: [
        "Practice integration by parts with simple examples first",
        "Review calculus fundamentals before next class",
      ],
    },
    Physics: {
      progressBars: [
        { label: "2/2 Classes Attended", value: 100, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "75% (7.5 GPA/B+)", value: 75, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "1/1 Topics Covered", value: 100, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Quantum mechanics introduction"]) } },
      ],
      strengths: [
        "Excellent engagement with new quantum concepts",
        "Asked great questions during class",
      ],
      improvements: [
        "Wave-particle duality still confusing",
        "Mathematical notation needs practice",
      ],
      recommendations: [
        "Watch introductory quantum mechanics videos",
        "Practice wave function notation exercises",
      ],
    },
    English: {
      progressBars: [
        { label: "1/2 Classes Attended", value: 50, gradient: gradients.classes, tooltip: { content: createTooltip("classes") } },
        { label: "65% (6.5 GPA/B)", value: 65, gradient: gradients.grade, tooltip: { content: createTooltip("grade") } },
        { label: "1/1 Topics Covered", value: 100, gradient: gradients.topics, tooltip: { content: createTooltip("topics", ["Persuasive essay writing"]) } },
      ],
      strengths: [
        "Good understanding of persuasive techniques",
        "Creative argument development",
      ],
      improvements: [
        "Missed one class this week",
        "Essay lacked strong evidence citations",
      ],
      recommendations: [
        "Catch up on missed material before next class",
        "Practice finding and citing evidence from texts",
      ],
    },
  },
};

interface DeepDiveSectionProps {
  timeRange?: TimeRange;
}

export function DeepDiveSection({ timeRange = "Last 3 months" }: DeepDiveSectionProps) {
  const [activeSubject, setActiveSubject] = useState<Subject>("Math");
  const subjectLabels = subjectLabelsByTimeRange[timeRange];
  const subjectData = subjectDataByTimeRange[timeRange];
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
            {subjectLabels[subject]}
          </button>
        ))}
      </div>

      {/* Progress Bars with AI Gradient */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjectData[activeSubject].progressBars.map((bar, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">{bar.label}</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="hover:opacity-70 transition-opacity">
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-72 bg-card border border-border shadow-lg" align="end">
                  {bar.tooltip.content}
                </PopoverContent>
              </Popover>
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
        <div className="border border-border rounded-xl p-5 relative">
          <div className="absolute -top-3 -right-3 z-10">
            <AISparkle size="sm" triggerKey={`${activeSubject}-${timeRange}`} />
          </div>
          <h4 className="font-bold text-foreground mb-4">
            Strengths:
          </h4>
          <ul className="space-y-3">
            {subjectData[activeSubject].strengths.map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                <span className={`text-${activeSubject.toLowerCase()}`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-border rounded-xl p-5 relative">
          <div className="absolute -top-3 -right-3 z-10">
            <AISparkle size="sm" triggerKey={`${activeSubject}-${timeRange}`} />
          </div>
          <h4 className="font-bold text-foreground mb-4">To Improve:</h4>
          <ul className="space-y-3">
            {subjectData[activeSubject].improvements.map((item, idx) => (
              <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                <span className={`text-${activeSubject.toLowerCase()}`}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="border border-border rounded-xl p-5 relative">
        <div className="absolute -top-3 -right-3 z-10">
          <AISparkle size="sm" triggerKey={`${activeSubject}-${timeRange}`} />
        </div>
        <h4 className="font-bold text-foreground mb-4">Recommendations:</h4>
        <ul className="space-y-2">
          {subjectData[activeSubject].recommendations.map((item, idx) => (
            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
              <span className={`text-${activeSubject.toLowerCase()} font-bold`}>•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
