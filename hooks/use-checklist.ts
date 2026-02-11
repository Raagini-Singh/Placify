"use client"

import { useState, useEffect, useCallback } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getUserData, saveUserData } from "@/lib/firestore"

interface ChecklistProgress {
  dsaProgress: number
  aptitudeProgress: number
  mockInterviewProgress: number
}

const STORAGE_KEY = "placify_checklist"

const defaultProgress: ChecklistProgress = {
  dsaProgress: 0,
  aptitudeProgress: 0,
  mockInterviewProgress: 0,
}

function loadProgress(): ChecklistProgress {
  if (typeof window === "undefined") return defaultProgress
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...defaultProgress, ...JSON.parse(stored) }
  } catch { /* ignore */ }
  return defaultProgress
}

export function useChecklist() {
  const [progress, setProgress] = useState<ChecklistProgress>(defaultProgress)
  const [uid, setUid] = useState<string | null>(null)

  // Load from localStorage instantly
  useEffect(() => {
    setProgress(loadProgress())
  }, [])

  // Sync with Firestore when user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const data = await getUserData(user.uid)
        if (data) {
          const firestoreProgress: ChecklistProgress = {
            dsaProgress: data.dsaProgress ?? 0,
            aptitudeProgress: data.aptitudeProgress ?? 0,
            mockInterviewProgress: data.mockInterviewProgress ?? 0,
          }
          setProgress(firestoreProgress)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(firestoreProgress))
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const updateProgress = useCallback(
    (field: keyof ChecklistProgress, value: number) => {
      setProgress((prev) => {
        const next = { ...prev, [field]: value }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        // Async save to Firestore
        if (uid) {
          saveUserData(uid, { [field]: value })
        }
        return next
      })
    },
    [uid]
  )

  const incrementProgress = useCallback(
    (field: keyof ChecklistProgress, max: number) => {
      setProgress((prev) => {
        const current = prev[field]
        if (current >= max) return prev
        const next = { ...prev, [field]: current + 1 }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        if (uid) {
          saveUserData(uid, { [field]: current + 1 })
        }
        return next
      })
    },
    [uid]
  )

  return {
    progress,
    updateProgress,
    incrementProgress,
  }
}
