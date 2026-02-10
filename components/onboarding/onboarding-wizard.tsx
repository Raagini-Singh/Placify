"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, ArrowRight, ArrowLeft, Check, Trophy, Star, Sparkles, Target } from "lucide-react"
import { StepPersonal } from "./step-personal"
import { StepAcademic } from "./step-academic"
import { StepSkillsResume } from "./step-skills-resume"

const steps = [
  { id: 1, label: "Personal", icon: "👤", achievement: "Identity Unlocked!" },
  { id: 2, label: "Academic", icon: "🎓", achievement: "Scholar Badge Earned!" },
  { id: 3, label: "Skills & Resume", icon: "🚀", achievement: "Profile Complete!" },
]

export interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  collegeName: string
  cgpa: string
  degree: string
  specialization: string
  skills: string[]
  resumeFile: File | null
}

export function OnboardingWizard() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAchievement, setShowAchievement] = useState(false)
  const [lastAchievement, setLastAchievement] = useState("")
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    collegeName: "",
    cgpa: "",
    degree: "",
    specialization: "",
    skills: [],
    resumeFile: null,
  })

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfileData((prev) => ({ ...prev, ...data }))
  }

  // Calculate completion percentage based on filled fields
  const completionPercentage = useMemo(() => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.email,
      profileData.phone,
      profileData.collegeName,
      profileData.cgpa,
      profileData.degree,
      profileData.specialization,
    ]
    const filledFields = fields.filter((f) => f.trim() !== "").length
    const skillsBonus = profileData.skills.length > 0 ? 1 : 0
    const resumeBonus = profileData.resumeFile ? 1 : 0
    const total = fields.length + 2 // skills + resume
    return Math.round(((filledFields + skillsBonus + resumeBonus) / total) * 100)
  }, [profileData])

  const nextStep = () => {
    if (currentStep < 3) {
      // Show achievement
      setLastAchievement(steps[currentStep - 1].achievement)
      setShowAchievement(true)
      setTimeout(() => setShowAchievement(false), 2500)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1)
  }

  const handleFinish = () => {
    setLastAchievement("🎉 Profile Master! You're all set!")
    setShowAchievement(true)
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const progress = (currentStep / 3) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-xl"
    >
      {/* Achievement Toast */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -top-20 left-1/2 z-50 -translate-x-1/2 flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 shadow-lg glow-velvet"
          >
            <Trophy className="h-5 w-5 text-champagne" />
            <span className="text-sm font-semibold text-primary-foreground whitespace-nowrap">
              {lastAchievement}
            </span>
            <Sparkles className="h-4 w-4 text-champagne" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-3xl p-8 md:p-10 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
            <Crown className="h-5 w-5 text-champagne" />
          </div>
          <span className="text-xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Plac<span className="text-primary">ify</span>
          </span>
        </div>

        <h2 className="mb-1 text-center text-xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Complete Your Profile
        </h2>
        <p className="mb-2 text-center text-sm text-muted-foreground">
          {"Step "}
          {currentStep}
          {" of 3 — "}
          {steps[currentStep - 1].label}
        </p>

        {/* Circular completion gauge */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="hsl(33 42% 87%)"
                strokeWidth="6"
              />
              <motion.circle
                cx="40"
                cy="40"
                r="35"
                fill="none"
                stroke="hsl(337 24% 24%)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 35}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                animate={{
                  strokeDashoffset: 2 * Math.PI * 35 * (1 - completionPercentage / 100),
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-primary">{completionPercentage}%</span>
            </div>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {completionPercentage < 50
              ? "Keep going! You're making progress 💪"
              : completionPercentage < 80
                ? "Almost there! Great progress 🔥"
                : completionPercentage < 100
                  ? "Just a bit more to go! 🌟"
                  : "Perfect! Profile complete! 🎉"}
          </p>
        </div>

        {/* Step indicators */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    currentStep > step.id
                      ? "bg-success text-success-foreground shadow-md"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground shadow-md glow-velvet"
                        : "border border-border bg-silk text-muted-foreground"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </motion.div>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    currentStep >= step.id
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-marble/50">
            <motion.div
              className="h-full rounded-full gradient-marble-velvet"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* XP / Points indicator */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 rounded-full bg-accent/50 px-3 py-1">
            <Star className="h-3.5 w-3.5 text-accent-foreground" />
            <span className="text-xs font-semibold text-accent-foreground">
              {currentStep * 100} XP earned
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1">
            <Target className="h-3.5 w-3.5 text-success" />
            <span className="text-xs font-semibold text-success">
              Level {currentStep}
            </span>
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 1 && (
              <StepPersonal data={profileData} onUpdate={updateProfile} />
            )}
            {currentStep === 2 && (
              <StepAcademic data={profileData} onUpdate={updateProfile} />
            )}
            {currentStep === 3 && (
              <StepSkillsResume data={profileData} onUpdate={updateProfile} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep < 3 ? (
            <motion.button
              type="button"
              onClick={nextStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all glow-velvet"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.button
              type="button"
              onClick={handleFinish}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 rounded-xl bg-success px-6 py-2.5 text-sm font-semibold text-success-foreground transition-all disabled:opacity-60 glow-teal"
            >
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-success-foreground border-t-transparent" />
              ) : (
                <>
                  Finish Setup
                  <Trophy className="h-4 w-4" />
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
