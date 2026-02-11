"use client"

import { motion } from "framer-motion"
import {
  ClipboardCheck,
  CheckCircle2,
  Circle,
  AlertTriangle,
  Target,
  BookOpen,
  Code2,
  MessageSquare,
  FileText,
  Brain,
  TrendingUp,
  ChevronRight,
  Plus,
} from "lucide-react"
import { useUserProfile } from "@/hooks/use-user-profile"
import { useChecklist } from "@/hooks/use-checklist"

const placementRounds = [
  { round: "Online Assessment", description: "MCQs on aptitude, coding questions (2-3 problems)", tips: ["Practice on LeetCode/HackerRank", "Time management is key", "Attempt all MCQs first"] },
  { round: "Technical Interview", description: "DSA, projects, CS fundamentals discussion", tips: ["Revise OS, DBMS, CN basics", "Be ready to code on whiteboard", "Explain thought process clearly"] },
  { round: "HR Interview", description: "Behavioral questions, salary discussion", tips: ["Prepare 'Tell me about yourself'", "Research the company", "Have questions ready for the interviewer"] },
  { round: "Group Discussion", description: "Current affairs, abstract topics, case studies", tips: ["Read news daily", "Practice structured arguments", "Listen before speaking"] },
]

export default function ChecklistPage() {
  const { profile, profileCompletion } = useUserProfile()
  const { progress, incrementProgress } = useChecklist()

  const checklistItems = [
    {
      id: "resume",
      category: "Documents",
      title: "Upload your resume",
      description: "Having an updated resume is essential for all placement drives.",
      completed: profile.resumeUploaded,
      priority: "high" as const,
      icon: FileText,
      actionType: "profile" as const,
    },
    {
      id: "skills",
      category: "Skills",
      title: "Add at least 5 skills to your profile",
      description: "More skills = better matching with opportunities.",
      completed: profile.skills.length >= 5,
      priority: "medium" as const,
      icon: Code2,
      actionType: "profile" as const,
    },
    {
      id: "dsa",
      category: "Preparation",
      title: "Complete 100 DSA problems",
      description: "Data Structures & Algorithms is tested in 90% of placement rounds.",
      completed: progress.dsaProgress >= 100,
      priority: "high" as const,
      icon: Brain,
      progress: progress.dsaProgress,
      total: 100,
      progressField: "dsaProgress" as const,
      actionType: "increment" as const,
    },
    {
      id: "aptitude",
      category: "Preparation",
      title: "Practice aptitude tests",
      description: "Quantitative, logical, and verbal aptitude are common Round 1 filters.",
      completed: progress.aptitudeProgress >= 50,
      priority: "medium" as const,
      icon: Target,
      progress: progress.aptitudeProgress,
      total: 50,
      progressField: "aptitudeProgress" as const,
      actionType: "increment" as const,
    },
    {
      id: "mock-interview",
      category: "Practice",
      title: "Complete 3 mock interviews",
      description: "Mock interviews build confidence and reduce nervousness.",
      completed: progress.mockInterviewProgress >= 3,
      priority: "medium" as const,
      icon: MessageSquare,
      progress: progress.mockInterviewProgress,
      total: 3,
      progressField: "mockInterviewProgress" as const,
      actionType: "increment" as const,
    },
    {
      id: "projects",
      category: "Portfolio",
      title: "Add 2 projects to your portfolio",
      description: "Real projects showcase practical skills to recruiters.",
      completed: false,
      priority: "low" as const,
      icon: BookOpen,
      actionType: "profile" as const,
    },
    {
      id: "gd",
      category: "Practice",
      title: "Practice Group Discussion topics",
      description: "GD rounds test communication and team skills.",
      completed: false,
      priority: "low" as const,
      icon: MessageSquare,
      actionType: "profile" as const,
    },
  ]

  // Compute weak areas based on actual progress
  const dsaPct = Math.round((progress.dsaProgress / 100) * 100)
  const aptitudePct = Math.round((progress.aptitudeProgress / 50) * 100)
  const mockPct = Math.round((progress.mockInterviewProgress / 3) * 100)

  const weakAreas = profile.onboardingCompleted
    ? [
        {
          area: "DSA Practice",
          score: dsaPct,
          tip: dsaPct < 50
            ? "Solve more DSA problems daily on LeetCode or HackerRank."
            : "Great progress! Keep solving to maintain your edge.",
        },
        {
          area: "Aptitude",
          score: aptitudePct,
          tip: aptitudePct < 50
            ? "Solve 10 problems daily on IndiaBix or Prepinsta."
            : "Strong aptitude skills! Keep practicing.",
        },
        {
          area: "Mock Interviews",
          score: mockPct,
          tip: mockPct < 100
            ? "Schedule mock interviews with peers or mentors."
            : "All mock interviews completed! Great job.",
        },
      ]
    : [
        { area: "DSA Practice", score: 0, tip: "Complete onboarding to get personalized recommendations." },
        { area: "Aptitude", score: 0, tip: "Complete onboarding to get personalized recommendations." },
        { area: "Mock Interviews", score: 0, tip: "Complete onboarding to get personalized recommendations." },
      ]

  const completedCount = checklistItems.filter((i) => i.completed).length
  const totalCount = checklistItems.length
  const completionPct = Math.round((completedCount / totalCount) * 100)

  const readiness = profile.onboardingCompleted
    ? Math.round(profileCompletion * 0.4 + completionPct * 0.6)
    : 0

  return (
    <div className="mx-auto max-w-5xl flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Placement Checklist
        </h1>
        <p className="mt-1 text-muted-foreground">
          Your personalised placement preparation guide based on your profile.
        </p>
      </motion.div>

      {/* Progress overview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <ClipboardCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedCount}/{totalCount}</p>
              <p className="text-xs text-muted-foreground">Tasks Completed</p>
            </div>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-marble/50">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${completionPct}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{weakAreas.filter((a) => a.score < 50).length}</p>
              <p className="text-xs text-muted-foreground">Areas to Improve</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/10">
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{readiness}%</p>
              <p className="text-xs text-muted-foreground">Placement Readiness</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Weak Areas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <AlertTriangle className="h-5 w-5 text-destructive" /> Areas to Focus
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          {weakAreas.map((area) => (
            <div key={area.area} className="rounded-xl bg-card p-4 border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">{area.area}</span>
                <span className={`text-xs font-bold ${area.score < 50 ? "text-destructive" : area.score < 80 ? "text-warning" : "text-success"}`}>
                  {area.score}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-marble/50 mb-2">
                <motion.div
                  className={`h-full rounded-full ${area.score < 50 ? "bg-destructive" : area.score < 80 ? "bg-warning" : "bg-success"}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${area.score}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
              <p className="text-xs text-muted-foreground">{area.tip}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Checklist Items */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 text-lg font-bold text-foreground">Your Tasks</h3>
        <div className="flex flex-col gap-3">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 rounded-xl p-4 transition-all ${
                item.completed ? "bg-success/5 border border-success/20" : "bg-background border border-border"
              }`}
            >
              {item.completed ? (
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-semibold ${item.completed ? "text-muted-foreground line-through" : "text-foreground"}`}>
                    {item.title}
                  </span>
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium uppercase ${
                    item.priority === "high" ? "bg-destructive/10 text-destructive" :
                    item.priority === "medium" ? "bg-warning/10 text-warning" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {item.priority}
                  </span>
                  <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                {item.progress !== undefined && item.total !== undefined && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-marble/50">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.progress / item.total) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {item.progress}/{item.total}
                    </span>
                    {!item.completed && item.actionType === "increment" && item.progressField && (
                      <button
                        onClick={() => incrementProgress(item.progressField!, item.total)}
                        className="flex h-7 items-center gap-1 rounded-lg bg-primary/10 px-2 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                      >
                        <Plus className="h-3 w-3" /> Log
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Placement Rounds Guide */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <BookOpen className="h-5 w-5 text-primary" /> Placement Rounds Guide
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {placementRounds.map((round, index) => (
            <div key={round.round} className="rounded-xl bg-background border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <h4 className="text-sm font-bold text-foreground">{round.round}</h4>
              </div>
              <p className="mb-3 text-xs text-muted-foreground">{round.description}</p>
              <ul className="flex flex-col gap-1">
                {round.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                    <ChevronRight className="h-3 w-3 text-primary flex-shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
