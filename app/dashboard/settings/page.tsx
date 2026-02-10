"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Settings,
  LogOut,
  Bell,
  Shield,
  User,
  Moon,
  Sun,
  ChevronRight,
  Trash2,
  Download,
  HelpCircle,
} from "lucide-react"
import { user } from "@/lib/mock-data"

export default function SettingsPage() {
  const router = useRouter()
  const [emailNotifs, setEmailNotifs] = useState(true)
  const [pushNotifs, setPushNotifs] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Settings
        </h1>
        <p className="mt-1 text-muted-foreground">
          Manage your account preferences.
        </p>
      </motion.div>

      {/* Account */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <User className="h-5 w-5 text-primary" /> Account
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-xl bg-background p-4 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <button className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
              Edit
            </button>
          </div>

          <button className="flex items-center justify-between rounded-xl bg-background p-4 border border-border text-left hover:bg-silk transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Change Password</p>
                <p className="text-xs text-muted-foreground">Update your account password</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Bell className="h-5 w-5 text-primary" /> Notifications
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-xl bg-background p-4 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive deadline reminders via email</p>
            </div>
            <button
              onClick={() => setEmailNotifs(!emailNotifs)}
              className={`relative h-6 w-11 rounded-full transition-colors ${emailNotifs ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${emailNotifs ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-background p-4 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Get alerts for urgent deadlines</p>
            </div>
            <button
              onClick={() => setPushNotifs(!pushNotifs)}
              className={`relative h-6 w-11 rounded-full transition-colors ${pushNotifs ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${pushNotifs ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Settings className="h-5 w-5 text-primary" /> Preferences
        </h3>
        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-between rounded-xl bg-background p-4 border border-border text-left hover:bg-silk transition-colors">
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Export Data</p>
                <p className="text-xs text-muted-foreground">Download your application history</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>

          <button className="flex items-center justify-between rounded-xl bg-background p-4 border border-border text-left hover:bg-silk transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Help & Support</p>
                <p className="text-xs text-muted-foreground">FAQs and contact support</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6"
      >
        <h3 className="mb-4 text-lg font-bold text-foreground">Danger Zone</h3>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-3 rounded-xl bg-card p-4 border border-border text-left hover:bg-silk transition-colors"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Log Out</p>
              <p className="text-xs text-muted-foreground">Sign out of your account</p>
            </div>
          </button>

          <button className="flex items-center gap-3 rounded-xl bg-card p-4 border border-destructive/30 text-left hover:bg-destructive/5 transition-colors">
            <Trash2 className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
