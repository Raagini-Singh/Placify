"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"

interface AuthUser {
  name: string
  email: string
  avatar: string
  photoURL: string | null
  uid: string | null
}

const fallback: AuthUser = {
  name: "User",
  email: "",
  avatar: "U",
  photoURL: null,
  uid: null,
}

export function useAuthUser(): AuthUser {
  const [authUser, setAuthUser] = useState<AuthUser>(fallback)

  useEffect(() => {
    // Try localStorage first for instant render
    const storedName = localStorage.getItem("userName")
    const storedEmail = localStorage.getItem("userEmail")
    if (storedName || storedEmail) {
      setAuthUser({
        name: storedName || "User",
        email: storedEmail || "",
        avatar: (storedName || "U").charAt(0).toUpperCase(),
        photoURL: null,
        uid: null,
      })
    }

    // Then listen to Firebase auth state for real-time updates
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || localStorage.getItem("userName") || "User"
        const email = user.email || localStorage.getItem("userEmail") || ""
        localStorage.setItem("userName", name)
        localStorage.setItem("userEmail", email)
        setAuthUser({
          name,
          email,
          avatar: name.charAt(0).toUpperCase(),
          photoURL: user.photoURL,
          uid: user.uid,
        })
      }
    })

    return () => unsubscribe()
  }, [])

  return authUser
}
