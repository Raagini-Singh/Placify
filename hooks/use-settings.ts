"use client"

import { useState, useEffect, useCallback } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getUserData, saveUserData } from "@/lib/firestore"

interface UserSettings {
  emailNotifs: boolean
  pushNotifs: boolean
}

const STORAGE_KEY = "placify_settings"

const defaultSettings: UserSettings = {
  emailNotifs: true,
  pushNotifs: true,
}

function loadSettings(): UserSettings {
  if (typeof window === "undefined") return defaultSettings
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return { ...defaultSettings, ...JSON.parse(stored) }
  } catch { /* ignore */ }
  return defaultSettings
}

export function useSettings() {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings)
  const [uid, setUid] = useState<string | null>(null)

  useEffect(() => {
    setSettings(loadSettings())
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid)
        const data = await getUserData(user.uid)
        if (data) {
          const firestoreSettings: UserSettings = {
            emailNotifs: data.emailNotifs ?? true,
            pushNotifs: data.pushNotifs ?? true,
          }
          setSettings(firestoreSettings)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(firestoreSettings))
        }
      }
    })
    return () => unsubscribe()
  }, [])

  const updateSettings = useCallback(
    (data: Partial<UserSettings>) => {
      setSettings((prev) => {
        const next = { ...prev, ...data }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        if (uid) saveUserData(uid, data)
        return next
      })
    },
    [uid]
  )

  return {
    settings,
    updateSettings,
  }
}
