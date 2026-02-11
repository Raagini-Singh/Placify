"use client"

import { useState, useEffect, useCallback } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getUserData, saveUserData } from "@/lib/firestore"

export interface UserProfile {
  // Personal
  firstName: string
  lastName: string
  phone: string
  // Academic
  collegeName: string
  degree: string
  cgpa: string
  specialization: string
  // Skills & Resume
  skills: string[]
  resumeUploaded: boolean
  resumeFileName: string
  // Meta
  onboardingCompleted: boolean
}

const STORAGE_KEY = "placify_user_profile"

const defaultProfile: UserProfile = {
  firstName: "",
  lastName: "",
  phone: "",
  collegeName: "",
  degree: "",
  cgpa: "",
  specialization: "",
  skills: [],
  resumeUploaded: false,
  resumeFileName: "",
  onboardingCompleted: false,
}

const degreeLabels: Record<string, string> = {
  btech: "B.Tech",
  bsc: "B.Sc",
  bca: "BCA",
  mtech: "M.Tech",
  msc: "M.Sc",
  mca: "MCA",
  mba: "MBA",
}

function loadProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...defaultProfile, ...JSON.parse(stored) }
    }
  } catch {
    // ignore parse errors
  }
  return defaultProfile
}

export function getUserProfile(): UserProfile {
  return loadProfile()
}

export function getDegreeLabel(value: string): string {
  return degreeLabels[value] || value
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile)
  const [uid, setUid] = useState<string | null>(null)

  // Load from localStorage instantly for fast render
  useEffect(() => {
    setProfile(loadProfile())
  }, [])

  // Sync with Firestore when user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const data = await getUserData(user.uid)
        if (data) {
          const firestoreProfile: UserProfile = {
            firstName: data.firstName ?? "",
            lastName: data.lastName ?? "",
            phone: data.phone ?? "",
            collegeName: data.collegeName ?? "",
            degree: data.degree ?? "",
            cgpa: data.cgpa ?? "",
            specialization: data.specialization ?? "",
            skills: data.skills ?? [],
            resumeUploaded: data.resumeUploaded ?? false,
            resumeFileName: data.resumeFileName ?? "",
            onboardingCompleted: data.onboardingCompleted ?? false,
          }
          setProfile(firestoreProfile)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(firestoreProfile))
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const updateProfile = useCallback(
    (data: Partial<UserProfile>) => {
      setProfile((prev) => {
        const next = { ...prev, ...data }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        // Async save to Firestore
        if (uid) {
          saveUserData(uid, data)
        }
        return next
      })
    },
    [uid]
  )

  // Profile completion: how much of their profile is filled out
  const profileCompletion = (() => {
    if (!profile.onboardingCompleted) return 0
    const fields = [
      profile.firstName,
      profile.lastName,
      profile.phone,
      profile.collegeName,
      profile.degree,
      profile.cgpa,
    ]
    const filled = fields.filter((f) => f.trim() !== "").length
    const skillsBonus = profile.skills.length > 0 ? 1 : 0
    const resumeBonus = profile.resumeUploaded ? 1 : 0
    const total = fields.length + 2
    return Math.round(((filled + skillsBonus + resumeBonus) / total) * 100)
  })()

  // Calculate match percentage for an opportunity based on user skills + CGPA
  const calculateMatch = useCallback(
    (requirements: string[]) => {
      if (!profile.onboardingCompleted) return 0
      if (profile.skills.length === 0 && !profile.cgpa) return 0
      if (requirements.length === 0) return 0

      const userSkillsLower = profile.skills.map((s) => s.toLowerCase())

      // Separate CGPA requirements from skill requirements
      const cgpaReq = requirements.find((r) => r.toLowerCase().includes("cgpa"))
      const skillReqs = requirements.filter((r) => !r.toLowerCase().includes("cgpa"))

      // Skill matching (80% weight)
      let skillPct = 0
      if (skillReqs.length > 0) {
        const matchedSkills = skillReqs.filter((req) => {
          const reqLower = req.toLowerCase()
          const parts = reqLower.split("/").map((p) => p.trim())
          return parts.some((part) =>
            userSkillsLower.some(
              (skill) => part.includes(skill) || skill.includes(part)
            )
          )
        })
        skillPct = (matchedSkills.length / skillReqs.length) * 80
      } else {
        skillPct = 40
      }

      // CGPA matching (20% weight)
      let cgpaPct = 0
      if (cgpaReq && profile.cgpa) {
        const reqNum = parseFloat(cgpaReq.replace(/[^0-9.]/g, ""))
        const userNum = parseFloat(profile.cgpa)
        if (!isNaN(reqNum) && !isNaN(userNum)) {
          cgpaPct = userNum >= reqNum ? 20 : Math.round((userNum / reqNum) * 20)
        }
      } else if (!cgpaReq) {
        cgpaPct = 20
      } else if (!profile.cgpa) {
        cgpaPct = 0
      }

      return Math.min(Math.round(skillPct + cgpaPct), 100)
    },
    [profile.skills, profile.cgpa, profile.onboardingCompleted]
  )

  return {
    profile,
    updateProfile,
    profileCompletion,
    calculateMatch,
  }
}
