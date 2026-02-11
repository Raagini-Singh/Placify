"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getUserData, saveUserData } from "@/lib/firestore"
import { opportunities } from "@/lib/mock-data"

export interface AppNotification {
  id: string
  type: "urgent" | "action" | "insight" | "achievement" | "update"
  title: string
  description: string
  time: string
  read: boolean
  iconName: string
  color: string
  bg: string
}

const STORAGE_KEY = "placify_read_notifications"

function loadReadIds(): string[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch { /* ignore */ }
  return []
}

function getProfile(): Record<string, any> | null {
  if (typeof window === "undefined") return null
  try {
    const stored = localStorage.getItem("placify_user_profile")
    return stored ? JSON.parse(stored) : null
  } catch { return null }
}

function getApplications(): Record<string, any> {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem("placify_applications")
    return stored ? JSON.parse(stored) : {}
  } catch { return {} }
}

function getChecklist(): Record<string, number> {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem("placify_checklist")
    return stored ? JSON.parse(stored) : {}
  } catch { return {} }
}

function timeAgo(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "Just now"
  if (mins < 60) return `${mins} min ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function generateNotifications(readIds: string[]): AppNotification[] {
  const profile = getProfile()
  const apps = getApplications()
  const checklist = getChecklist()
  const now = new Date()
  const notifications: AppNotification[] = []

  // 1. Deadline alerts (urgent: < 6h, warning: < 24h)
  opportunities.forEach((opp) => {
    const deadline = new Date(opp.deadline)
    const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60)
    if (hoursLeft > 0 && hoursLeft <= 6) {
      const id = `deadline-urgent-${opp.id}`
      notifications.push({
        id,
        type: "urgent",
        title: `${opp.company} deadline in ${hoursLeft < 1 ? `${Math.round(hoursLeft * 60)} minutes` : `${hoursLeft.toFixed(1)} hours`}!`,
        description: `Your application for ${opp.role} at ${opp.company} is due soon. Apply now to avoid missing out.`,
        time: "Now",
        read: readIds.includes(id),
        iconName: "AlertTriangle",
        color: "text-destructive",
        bg: "bg-destructive/10",
      })
    } else if (hoursLeft > 6 && hoursLeft <= 24) {
      const id = `deadline-soon-${opp.id}`
      notifications.push({
        id,
        type: "urgent",
        title: `${opp.company} deadline in ${Math.round(hoursLeft)} hours`,
        description: `${opp.role} position at ${opp.company} closes soon.`,
        time: timeAgo(new Date(now.getTime() - (24 - hoursLeft) * 60 * 60 * 1000)),
        read: readIds.includes(id),
        iconName: "Clock",
        color: "text-warning",
        bg: "bg-warning/10",
      })
    }
  })

  // 2. Profile actions
  if (!profile || !profile.resumeUploaded) {
    const id = "action-resume"
    notifications.push({
      id,
      type: "action",
      title: "Resume not uploaded!",
      description: "Upload your resume to improve matching and apply faster. Many companies require it for initial screening.",
      time: "Action needed",
      read: readIds.includes(id),
      iconName: "FileText",
      color: "text-primary",
      bg: "bg-primary/10",
    })
  }

  if (!profile || !profile.onboardingCompleted) {
    const id = "action-profile"
    notifications.push({
      id,
      type: "action",
      title: "Complete your profile",
      description: "Complete onboarding to unlock opportunity matching and personalized recommendations.",
      time: "Action needed",
      read: readIds.includes(id),
      iconName: "CheckCircle2",
      color: "text-muted-foreground",
      bg: "bg-muted",
    })
  } else if (profile) {
    // Check profile completion
    const fields = [profile.firstName, profile.lastName, profile.phone, profile.collegeName, profile.degree, profile.cgpa]
    const filled = fields.filter((f: string) => f && f.trim() !== "").length
    const skillsBonus = (profile.skills?.length || 0) > 0 ? 1 : 0
    const resumeBonus = profile.resumeUploaded ? 1 : 0
    const total = fields.length + 2
    const pct = Math.round(((filled + skillsBonus + resumeBonus) / total) * 100)
    if (pct < 100) {
      const id = "action-profile-incomplete"
      notifications.push({
        id,
        type: "action",
        title: "Complete your profile",
        description: `Your profile is ${pct}% complete. Add more details for better matches.`,
        time: "Suggestion",
        read: readIds.includes(id),
        iconName: "CheckCircle2",
        color: "text-muted-foreground",
        bg: "bg-muted",
      })
    }
  }

  if (profile && profile.onboardingCompleted && (!profile.skills || profile.skills.length < 5)) {
    const id = "action-skills"
    notifications.push({
      id,
      type: "action",
      title: "Add more skills",
      description: "Adding at least 5 skills significantly improves your match percentages with opportunities.",
      time: "Suggestion",
      read: readIds.includes(id),
      iconName: "Code2",
      color: "text-primary",
      bg: "bg-primary/10",
    })
  }

  // 3. Best match notification
  if (profile && profile.onboardingCompleted && profile.skills?.length > 0) {
    const userSkillsLower = profile.skills.map((s: string) => s.toLowerCase())
    let bestMatch = { company: "", role: "", pct: 0 }
    opportunities.forEach((opp) => {
      const skillReqs = opp.requirements.filter((r) => !r.toLowerCase().includes("cgpa"))
      if (skillReqs.length === 0) return
      const matched = skillReqs.filter((req) => {
        const parts = req.toLowerCase().split("/").map((p) => p.trim())
        return parts.some((part) => userSkillsLower.some((s: string) => part.includes(s) || s.includes(part)))
      })
      const pct = Math.round((matched.length / skillReqs.length) * 100)
      if (pct > bestMatch.pct) {
        bestMatch = { company: opp.company, role: opp.role, pct }
      }
    })
    if (bestMatch.pct >= 50) {
      const id = "insight-best-match"
      notifications.push({
        id,
        type: "insight",
        title: "New opportunity matches your profile",
        description: `${bestMatch.company} posted a ${bestMatch.role} role with ${bestMatch.pct}% match to your skills.`,
        time: "Insight",
        read: readIds.includes(id),
        iconName: "Target",
        color: "text-success",
        bg: "bg-success/10",
      })
    }
  }

  // 4. Application activity
  const appCount = Object.keys(apps).length
  if (appCount === 0 && profile?.onboardingCompleted) {
    const id = "insight-no-apps"
    notifications.push({
      id,
      type: "insight",
      title: "No applications yet",
      description: "You haven't applied to any opportunities yet. Start applying to improve your placement chances!",
      time: "Suggestion",
      read: readIds.includes(id),
      iconName: "TrendingUp",
      color: "text-warning",
      bg: "bg-warning/10",
    })
  }

  // 5. Achievement notifications
  if (appCount >= 1) {
    const id = "achievement-first-app"
    notifications.push({
      id,
      type: "achievement",
      title: "Achievement Unlocked: First Application!",
      description: "You submitted your first application. Keep the momentum going!",
      time: "Achievement",
      read: readIds.includes(id),
      iconName: "Star",
      color: "text-primary",
      bg: "bg-accent",
    })
  }

  if (profile?.skills?.length >= 5) {
    const id = "achievement-5-skills"
    notifications.push({
      id,
      type: "achievement",
      title: "Achievement Unlocked: 5 Skills Added!",
      description: "Great job building your skill profile! Companies can now match you better.",
      time: "Achievement",
      read: readIds.includes(id),
      iconName: "Star",
      color: "text-primary",
      bg: "bg-accent",
    })
  }

  // 6. Checklist milestones
  if ((checklist.dsaProgress || 0) >= 50) {
    const id = "achievement-dsa-50"
    notifications.push({
      id,
      type: "achievement",
      title: "DSA Milestone: 50 problems solved!",
      description: "You're halfway through your DSA goal. Keep pushing!",
      time: "Achievement",
      read: readIds.includes(id),
      iconName: "Trophy",
      color: "text-primary",
      bg: "bg-accent",
    })
  }

  // 7. Interview scheduled (from applications)
  Object.entries(apps).forEach(([oppId, app]: [string, any]) => {
    if (app.status === "interview") {
      const opp = opportunities.find((o) => o.id === oppId)
      if (opp) {
        const id = `update-interview-${oppId}`
        notifications.push({
          id,
          type: "update",
          title: `${opp.company} interview scheduled`,
          description: `Your ${opp.role} interview at ${opp.company} is scheduled. Prepare well!`,
          time: "Update",
          read: readIds.includes(id),
          iconName: "Briefcase",
          color: "text-success",
          bg: "bg-success/10",
        })
      }
    }
    if (app.status === "selected") {
      const opp = opportunities.find((o) => o.id === oppId)
      if (opp) {
        const id = `update-selected-${oppId}`
        notifications.push({
          id,
          type: "achievement",
          title: `🎉 Selected at ${opp.company}!`,
          description: `Congratulations! You've been selected for the ${opp.role} position.`,
          time: "Update",
          read: readIds.includes(id),
          iconName: "Trophy",
          color: "text-success",
          bg: "bg-success/10",
        })
      }
    }
  })

  return notifications
}

export function useNotifications() {
  const [readIds, setReadIds] = useState<string[]>([])
  const [refreshKey, setRefreshKey] = useState(0)
  const [uid, setUid] = useState<string | null>(null)

  // Load read IDs from localStorage
  useEffect(() => {
    setReadIds(loadReadIds())
  }, [])

  // Sync with Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const data = await getUserData(user.uid)
        if (data?.readNotifications) {
          setReadIds(data.readNotifications)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.readNotifications))
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const notifications = useMemo(() => {
    return generateNotifications(readIds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readIds, refreshKey])

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length
  }, [notifications])

  const markAsRead = useCallback(
    (notifId: string) => {
      setReadIds((prev) => {
        if (prev.includes(notifId)) return prev
        const next = [...prev, notifId]
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        if (uid) saveUserData(uid, { readNotifications: next })
        return next
      })
    },
    [uid]
  )

  const markAllAsRead = useCallback(() => {
    const allIds = notifications.map((n) => n.id)
    setReadIds(allIds)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allIds))
    if (uid) saveUserData(uid, { readNotifications: allIds })
  }, [notifications, uid])

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1)
  }, [])

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    refresh,
  }
}
