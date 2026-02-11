"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { getUserData, saveUserData } from "@/lib/firestore"

import { Crown, Mail, Lock, User, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [googleVerified, setGoogleVerified] = useState(false)
  const [googleDisplayName, setGoogleDisplayName] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [passwordError, setPasswordError] = useState("")

  const isLogin = mode === "login"

  // Google sign-in for LOGIN — direct redirect
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      const token = await user.getIdToken()
      localStorage.setItem("token", token)
      localStorage.setItem("userEmail", user.email || "")
      localStorage.setItem("userName", user.displayName || "")

      // Ensure Firestore doc exists
      const existing = await getUserData(user.uid)
      if (!existing) {
        await saveUserData(user.uid, {
          firstName: user.displayName?.split(" ")[0] || "",
          lastName: user.displayName?.split(" ").slice(1).join(" ") || "",
          phone: "",
          collegeName: "",
          degree: "",
          cgpa: "",
          specialization: "",
          skills: [],
          resumeUploaded: false,
          resumeFileName: "",
          onboardingCompleted: false,
          emailNotifs: true,
          pushNotifs: true,
          dsaProgress: 0,
          aptitudeProgress: 0,
          mockInterviewProgress: 0,
          applications: {},
          readNotifications: [],
        })
      }

      // Check if onboarding is complete
      if (existing?.onboardingCompleted) {
        router.push("/dashboard")
      } else {
        router.push("/onboarding")
      }
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Google sign-in failed")
    } finally {
      setIsLoading(false)
    }
  }

  // Google verify for SIGNUP — capture email, stay on form
  const verifyWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      setIsLoading(true)
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      setFormData((prev) => ({
        ...prev,
        email: user.email || "",
        name: user.displayName || prev.name,
      }))
      setGoogleVerified(true)
      setGoogleDisplayName(user.displayName || "")
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Google verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLogin && !googleVerified) {
      alert("Please verify your email with Google first.")
      return
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }
    setPasswordError("")
    setIsLoading(true)

    // Store user info for dashboard display
    localStorage.setItem("userName", formData.name || googleDisplayName || "User")
    localStorage.setItem("userEmail", formData.email)

    setTimeout(() => {
      setIsLoading(false)
      if (isLogin) {
        router.push("/dashboard")
      } else {
        router.push("/onboarding")
      }
    }, 1000)
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md"
    >
      <div className="glass rounded-3xl p-8 md:p-10 shadow-xl">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
            <Crown className="h-5 w-5 text-champagne" />
          </div>
          <span className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Plac<span className="text-primary">ify</span>
          </span>
        </Link>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            {isLogin ? "Welcome back" : googleVerified ? "Complete registration" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Sign in to track your placements"
              : googleVerified
              ? `Registering as ${formData.email}`
              : "Verify your email with Google to get started"}
          </p>
        </div>

        {/* SIGNUP: Step 1 — Verify with Google first */}
        {!isLogin && !googleVerified && (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl border border-champagne/60 bg-champagne/15 p-4 text-center">
              <p className="text-sm font-medium text-foreground mb-1">Step 1: Verify your email</p>
              <p className="text-xs text-muted-foreground">
                Click below to sign in with Google. Your verified email will be used for registration.
              </p>
            </div>

            <motion.button
              type="button"
              onClick={verifyWithGoogle}
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-silk/30 text-sm font-medium text-foreground transition-all hover:bg-marble/40 shadow-sm disabled:opacity-60"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <>
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  Verify with Google
                </>
              )}
            </motion.button>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        )}

        {/* SIGNUP: Step 2 — Fill form after Google verification */}
        <AnimatePresence>
        {(!isLogin && googleVerified) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Verified badge */}
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                Email verified via Google
              </span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-12 w-full rounded-xl border border-border bg-silk/50 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  required
                />
              </div>

              {/* Email — locked from Google */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                <input
                  type="email"
                  value={formData.email}
                  readOnly
                  className="h-12 w-full rounded-xl border border-green-200 bg-green-50/50 pl-11 pr-4 text-sm text-foreground cursor-not-allowed"
                />
                <CheckCircle2 className="absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
              </div>

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="h-12 w-full rounded-xl border border-border bg-silk/50 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))
                      if (passwordError) setPasswordError("")
                    }}
                    className={`h-12 w-full rounded-xl border bg-silk/50 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 transition-all ${
                      passwordError ? "border-destructive focus:border-destructive focus:ring-destructive" : "border-border focus:border-primary focus:ring-primary"
                    }`}
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="mt-1.5 text-xs text-destructive">{passwordError}</p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition-all disabled:opacity-60 glow-velvet"
              >
                {isLoading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </motion.div>
        )}
        </AnimatePresence>

        {/* LOGIN: Original form */}
        {isLogin && (
          <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="email"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="h-12 w-full rounded-xl border border-border bg-silk/50 pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="h-12 w-full rounded-xl border border-border bg-silk/50 pl-11 pr-11 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-xs text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group mt-2 flex h-12 items-center justify-center gap-2 rounded-xl bg-primary font-semibold text-primary-foreground transition-all disabled:opacity-60 glow-velvet"
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <button
          type="button"
          onClick={signInWithGoogle}
          className="mt-4 flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-border bg-silk/30 text-sm font-medium text-foreground transition-all hover:bg-marble/40 shadow-sm"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
          </>
        )}
      </div>
    </motion.div>
  )
}
