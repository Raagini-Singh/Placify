"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Crown } from "lucide-react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setStatus("authenticated")
      } else {
        // Check if we have a localStorage token (for email/password signups not yet in Firebase)
        const token = localStorage.getItem("token")
        if (token) {
          setStatus("authenticated")
        } else {
          setStatus("unauthenticated")
          router.replace("/auth/login")
        }
      }
    })
    return () => unsubscribe()
  }, [router])

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg animate-pulse">
            <Crown className="h-6 w-6 text-champagne" />
          </div>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-marble/50">
            <div className="h-full w-1/2 rounded-full bg-primary animate-[shimmer_1s_ease-in-out_infinite_alternate]"
              style={{ animation: "pulse 1s ease-in-out infinite alternate" }}
            />
          </div>
          <p className="text-sm text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (status === "unauthenticated") return null

  return <>{children}</>
}
