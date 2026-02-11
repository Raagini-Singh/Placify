"use client"

import { useState, useEffect, useCallback } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getUserData, saveUserData } from "@/lib/firestore"
import type { ApplicationStatus } from "@/lib/mock-data"

interface Application {
  opportunityId: string
  status: ApplicationStatus
  appliedAt: number
}

const STORAGE_KEY = "placify_applications"

function loadApplications(): Record<string, Application> {
  if (typeof window === "undefined") return {}
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // ignore parse errors
  }
  return {}
}

export function useApplications() {
  const [applications, setApplications] = useState<Record<string, Application>>({})
  const [uid, setUid] = useState<string | null>(null)

  // Load from localStorage instantly
  useEffect(() => {
    setApplications(loadApplications())
  }, [])

  // Sync with Firestore when user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const data = await getUserData(user.uid)
        if (data?.applications) {
          setApplications(data.applications)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data.applications))
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const updateApplicationStatus = useCallback(
    (opportunityId: string, status: ApplicationStatus) => {
      setApplications((prev) => {
        const next = {
          ...prev,
          [opportunityId]: {
            opportunityId,
            status,
            appliedAt: prev[opportunityId]?.appliedAt || Date.now(),
          },
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        // Async save to Firestore
        if (uid) {
          saveUserData(uid, { applications: next })
        }
        return next
      })
    },
    [uid]
  )

  const getApplicationStatus = useCallback(
    (opportunityId: string): ApplicationStatus | null => {
      return applications[opportunityId]?.status || null
    },
    [applications]
  )

  return {
    applications,
    updateApplicationStatus,
    getApplicationStatus,
  }
}
