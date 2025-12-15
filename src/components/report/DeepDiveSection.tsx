import { SubjectTabs } from "./SubjectTabs";

interface SkillInfo {
  name: string;
  sessions: string;
  questions: string;
}

const skillCategories = [
  { 
    label: "MCQ Classes Attender", 
    active: true,
    skills: [
      { name: "Silence (Average Intervention)", sessions: "100 <40 min", questions: "300 <100 min" },
      { name: "Silence (Average score when fully alert)", sessions: "100 <40 min", questions: "500 <200 min" },
      { name: "Wall: Number of class Classes she has taken based on", sessions: "30 <5 min", questions: "" },
    ]
  },
  { 
    label: "MCQ Class Enquiry", 
    active: false,
    skills: []
  },
  { 
    label: "Full Practice Content", 
    active: false,
    skills: []
  },
];

const strengths = [
  "Demonstrates a strong aptitude for problem-solving, often excelling in complex scenarios.",
  "Displays persistence in mastering new subjects and skills.",
  "Collaborates effectively with peers, contributing positively to group activities.",
  "Shows genuine interest in exploring new topics.",
  "Produces neat, well organized written work.",
  "Provides exceptional attention to detail in math and science/social science subjects.",
];

const improvements = [
  "Demonstrates a strong aptitude for problem-solving, often excelling in complex scenarios.",
  "Display persistence in mastering new subjects, patience can help improve understanding.",
  "Collaborate effectively with peers, particularly with group activities.",
  "Show genuine interest, work at a fraction of time.",
  "Produce neat, well organized written work.",
  "Provide exceptional attention to detail and science/social science subjects.",
];

export function DeepDiveSection() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Add your skills & mastery, the subject you enjoy of the first best current topics in question.
        </p>
        <SubjectTabs />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 flex-wrap">
        {skillCategories.map((cat) => (
          <button
            key={cat.label}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat.active 
                ? "bg-foreground text-background" 
                : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skills Table */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-muted-foreground">Skill/Concept Name</th>
                <th className="text-left py-2 font-semibold text-muted-foreground">Work/Sessions Time</th>
                <th className="text-left py-2 font-semibold text-muted-foreground">Home Tutored</th>
              </tr>
            </thead>
            <tbody>
              {skillCategories[0].skills.map((skill, idx) => (
                <tr key={idx} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground">{skill.name}</td>
                  <td className="py-2.5 text-muted-foreground">{skill.sessions}</td>
                  <td className="py-2.5 text-muted-foreground">{skill.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">
            - Shares good problem solving skills across practical and science subjects.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-semibold text-muted-foreground">Skill/Concept Name</th>
                <th className="text-left py-2 font-semibold text-muted-foreground">Work/Sessions Time</th>
                <th className="text-left py-2 font-semibold text-muted-foreground">Syllabus</th>
              </tr>
            </thead>
            <tbody>
              {skillCategories[0].skills.map((skill, idx) => (
                <tr key={idx} className="border-b border-border/50">
                  <td className="py-2.5 text-foreground">{skill.name}</td>
                  <td className="py-2.5 text-muted-foreground">{skill.sessions}</td>
                  <td className="py-2.5 text-muted-foreground">{skill.questions}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">
            - Shares good problem solving skills across practical and science subjects.
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-foreground mb-4">Recommendations</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-accent/30 rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">Strengths</h4>
            <ul className="space-y-2">
              {strengths.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-primary font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-accent/30 rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">To improve</h4>
            <ul className="space-y-2">
              {improvements.map((item, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                  <span className="text-secondary font-bold">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
