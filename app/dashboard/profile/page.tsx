"use client"

import { motion } from "framer-motion"
import { User, Mail, Phone, GraduationCap, BookOpen, Code2, FileText, Edit3, Trophy, Star, Target } from "lucide-react"
import { user } from "@/lib/mock-data"

export default function ProfilePage() {
  const profileSections = [
    { label: "Personal Info", filled: true, icon: User },
    { label: "Academic Details", filled: true, icon: GraduationCap },
    { label: "Skills", filled: user.skills.length > 0, icon: Code2 },
    { label: "Resume", filled: user.resumeUploaded, icon: FileText },
  ]

  const completedCount = profileSections.filter((s) => s.filled).length
  const completionPct = Math.round((completedCount / profileSections.length) * 100)

  return (
    <div className="mx-auto max-w-4xl flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Your Profile
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your profile to improve opportunity matching.
        </p>
      </motion.div>

      {/* Profile Completion Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="flex items-center gap-6">
          <div className="relative flex h-24 w-24 items-center justify-center flex-shrink-0">
            <svg className="h-24 w-24 -rotate-90" viewBox="0 0 96 96">
              <circle cx="48" cy="48" r="42" fill="none" stroke="hsl(33 42% 87%)" strokeWidth="6" />
              <motion.circle
                cx="48" cy="48" r="42" fill="none"
                stroke={completionPct === 100 ? "hsl(150 60% 40%)" : "hsl(337 24% 24%)"}
                strokeWidth="6" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - completionPct / 100) }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-primary">{completionPct}%</span>
              <span className="text-[10px] text-muted-foreground">Complete</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground">Profile Strength</h3>
            <p className="text-sm text-muted-foreground mb-3">
              {completionPct < 100 ? "Complete your profile to unlock more matched opportunities" : "Your profile is complete! 🎉"}
            </p>
            <div className="flex flex-wrap gap-2">
              {profileSections.map((section) => (
                <div
                  key={section.label}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
                    section.filled
                      ? "bg-success/10 text-success"
                      : "bg-accent text-accent-foreground"
                  }`}
                >
                  <section.icon className="h-3 w-3" />
                  {section.label}
                  {!section.filled && " ⚠️"}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Trophy className="h-5 w-5 text-primary" /> Achievements
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { name: "Profile Started", icon: "🚀", earned: true },
            { name: "First Application", icon: "📝", earned: true },
            { name: "5 Skills Added", icon: "💪", earned: user.skills.length >= 5 },
            { name: "Resume Uploaded", icon: "📄", earned: user.resumeUploaded },
          ].map((badge) => (
            <div
              key={badge.name}
              className={`flex flex-col items-center rounded-xl p-4 text-center transition-all ${
                badge.earned ? "bg-accent/50 shadow-sm" : "bg-muted/30 opacity-50"
              }`}
            >
              <span className="mb-2 text-2xl">{badge.icon}</span>
              <span className="text-xs font-medium text-foreground">{badge.name}</span>
              {badge.earned && (
                <span className="mt-1 flex items-center gap-1 text-[10px] text-success font-medium">
                  <Star className="h-3 w-3" /> Earned
                </span>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Profile Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Personal Information</h3>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
            <Edit3 className="h-3 w-3" /> Edit
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-background p-3">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="text-sm font-medium text-foreground">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-background p-3">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-background p-3">
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">College</p>
              <p className="text-sm font-medium text-foreground">{user.college}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-background p-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Degree & CGPA</p>
              <p className="text-sm font-medium text-foreground">{user.degree} • {user.cgpa}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Code2 className="h-5 w-5 text-primary" /> Skills
          </h3>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
            <Edit3 className="h-3 w-3" /> Edit
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <Target className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            Adding more skills improves your match percentage with companies
          </span>
        </div>
      </motion.div>
    </div>
  )
}
