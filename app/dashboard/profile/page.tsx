"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, GraduationCap, BookOpen, Code2, FileText, Edit3, Trophy, Star, Target, X, Plus, Save } from "lucide-react"
import { useAuthUser } from "@/hooks/use-auth-user"
import { useUserProfile, getDegreeLabel } from "@/hooks/use-user-profile"
import { useApplications } from "@/hooks/use-applications"

export default function ProfilePage() {
  const authUser = useAuthUser()
  const { profile, profileCompletion, updateProfile } = useUserProfile()
  const { applications } = useApplications()
  const [editingSection, setEditingSection] = useState<string | null>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    phone: profile.phone,
    collegeName: profile.collegeName,
    degree: profile.degree,
    cgpa: profile.cgpa,
    specialization: profile.specialization,
    skills: [...profile.skills],
    skillInput: "",
  })

  const displayName = profile.onboardingCompleted
    ? `${profile.firstName} ${profile.lastName}`.trim() || authUser.name
    : authUser.name
  const displayEmail = authUser.email
  const displayCollege = profile.collegeName || "Not provided"
  const displayDegree = profile.degree ? getDegreeLabel(profile.degree) : "Not provided"
  const displayCgpa = profile.cgpa || "—"
  const displaySkills = profile.skills
  const hasResume = profile.resumeUploaded

  const profileSections = [
    { label: "Personal Info", filled: !!(profile.firstName && profile.lastName && profile.phone), icon: User },
    { label: "Academic Details", filled: !!(profile.collegeName && profile.degree && profile.cgpa), icon: GraduationCap },
    { label: "Skills", filled: displaySkills.length > 0, icon: Code2 },
    { label: "Resume", filled: hasResume, icon: FileText },
  ]

  const completedCount = profileSections.filter((s) => s.filled).length
  const completionPct = profile.onboardingCompleted ? profileCompletion : 0

  const handleSavePersonal = () => {
    updateProfile({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      onboardingCompleted: true,
    })
    setEditingSection(null)
  }

  const handleSaveAcademic = () => {
    updateProfile({
      collegeName: formData.collegeName,
      degree: formData.degree,
      cgpa: formData.cgpa,
      specialization: formData.specialization,
      onboardingCompleted: true,
    })
    setEditingSection(null)
  }

  const handleSaveSkills = () => {
    updateProfile({
      skills: formData.skills,
      onboardingCompleted: true,
    })
    setEditingSection(null)
  }

  const handleAddSkill = () => {
    const trimmed = formData.skillInput.trim()
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
        skillInput: "",
      }))
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      updateProfile({
        resumeUploaded: true,
        resumeFileName: file.name,
        onboardingCompleted: true,
      })
    }
  }

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
            { name: "Profile Started", icon: "🚀", earned: profile.onboardingCompleted },
            { name: "First Application", icon: "📝", earned: Object.keys(applications).length > 0 },
            { name: "5 Skills Added", icon: "💪", earned: displaySkills.length >= 5 },
            { name: "Resume Uploaded", icon: "📄", earned: hasResume },
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
          {editingSection !== "personal" && (
            <button
              onClick={() => {
                setFormData({
                  ...formData,
                  firstName: profile.firstName,
                  lastName: profile.lastName,
                  phone: profile.phone,
                })
                setEditingSection("personal")
              }}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          )}
        </div>
        
        {editingSection === "personal" ? (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSavePersonal}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Save className="h-3.5 w-3.5" /> Save
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-background p-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Full Name</p>
                <p className="text-sm font-medium text-foreground">{displayName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-background p-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{displayEmail || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-background p-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium text-foreground">{profile.phone || "Not provided"}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Academic Details */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Academic Details</h3>
          {editingSection !== "academic" && (
            <button
              onClick={() => {
                setFormData({
                  ...formData,
                  collegeName: profile.collegeName,
                  degree: profile.degree,
                  cgpa: profile.cgpa,
                  specialization: profile.specialization,
                })
                setEditingSection("academic")
              }}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          )}
        </div>

        {editingSection === "academic" ? (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                College / University
              </label>
              <input
                type="text"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                placeholder="e.g., IIT Bombay"
                className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Degree
                </label>
                <select
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select...</option>
                  <option value="btech">B.Tech</option>
                  <option value="bsc">B.Sc</option>
                  <option value="bca">BCA</option>
                  <option value="mtech">M.Tech</option>
                  <option value="msc">M.Sc</option>
                  <option value="mca">MCA</option>
                  <option value="mba">MBA</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                  placeholder="8.5"
                  className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Minor / Specialization
              </label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                placeholder="e.g., Cybersecurity, AI/ML"
                className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveAcademic}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Save className="h-3.5 w-3.5" /> Save
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl bg-background p-3">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">College</p>
                <p className="text-sm font-medium text-foreground">{displayCollege}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-background p-3">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Degree & CGPA</p>
                <p className="text-sm font-medium text-foreground">{displayDegree} • {displayCgpa}</p>
              </div>
            </div>
          </div>
        )}
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
          {editingSection !== "skills" && (
            <button
              onClick={() => {
                setFormData({
                  ...formData,
                  skills: [...profile.skills],
                  skillInput: "",
                })
                setEditingSection("skills")
              }}
              className="flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <Edit3 className="h-3 w-3" /> Edit
            </button>
          )}
        </div>

        {editingSection === "skills" ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.skillInput}
                onChange={(e) => setFormData({ ...formData, skillInput: e.target.value })}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                placeholder="Type a skill and press Enter"
                className="h-11 flex-1 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-primary/60 hover:text-primary transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleSaveSkills}
                className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <Save className="h-3.5 w-3.5" /> Save
              </button>
              <button
                onClick={() => setEditingSection(null)}
                className="flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-3.5 w-3.5" /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-2">
              {displaySkills.length > 0 ? (
                displaySkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No skills added yet. Click edit to add skills.</p>
              )}
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <Target className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                Adding more skills improves your match percentage with companies
              </span>
            </div>
          </>
        )}
      </motion.div>

      {/* Resume */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4">
          <FileText className="h-5 w-5 text-primary" /> Resume
        </h3>
        {hasResume ? (
          <div className="flex items-center justify-between rounded-xl bg-success/10 border border-success/20 p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm font-medium text-foreground">{profile.resumeFileName || "Resume uploaded"}</p>
                <p className="text-xs text-muted-foreground">PDF file</p>
              </div>
            </div>
            <label className="cursor-pointer rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
              Update
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/30 p-8 transition-colors hover:border-primary/50 hover:bg-secondary/50">
            <FileText className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium text-foreground">Upload your resume</p>
            <p className="text-xs text-muted-foreground mt-1">PDF only, max 5MB</p>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
      </motion.div>
    </div>
  )
}
