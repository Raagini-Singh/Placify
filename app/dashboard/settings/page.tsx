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
  ChevronRight,
  Trash2,
  Download,
  HelpCircle,
  CheckCircle2,
} from "lucide-react"
import { signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { deleteUserDocument } from "@/lib/firestore"
import { useAuthUser } from "@/hooks/use-auth-user"
import { useSettings } from "@/hooks/use-settings"

export default function SettingsPage() {
  const router = useRouter()
  const user = useAuthUser()
  const { settings, updateSettings } = useSettings()
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [exportMessage, setExportMessage] = useState("")

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem("userName")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("token")
      localStorage.removeItem("placify_user_profile")
      localStorage.removeItem("placify_applications")
      localStorage.removeItem("placify_checklist")
      localStorage.removeItem("placify_settings")
      localStorage.removeItem("placify_read_notifications")
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const handleChangePassword = async () => {
    setPasswordMessage("")
    const currentUser = auth.currentUser
    if (!currentUser || !currentUser.email) {
      setPasswordMessage("No authenticated user found.")
      return
    }
    try {
      const credential = EmailAuthProvider.credential(currentUser.email, currentPassword)
      await reauthenticateWithCredential(currentUser, credential)
      await updatePassword(currentUser, newPassword)
      setPasswordMessage("Password updated successfully!")
      setCurrentPassword("")
      setNewPassword("")
      setTimeout(() => {
        setShowPasswordModal(false)
        setPasswordMessage("")
      }, 1500)
    } catch (error: any) {
      if (error.code === "auth/wrong-password") {
        setPasswordMessage("Current password is incorrect.")
      } else if (error.code === "auth/weak-password") {
        setPasswordMessage("New password must be at least 6 characters.")
      } else {
        setPasswordMessage(error.message || "Failed to update password.")
      }
    }
  }

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    try {
      const currentUser = auth.currentUser
      if (currentUser) {
        await deleteUserDocument(currentUser.uid)
        await deleteUser(currentUser)
      }
      localStorage.clear()
      router.push("/")
    } catch (error: any) {
      console.error("Delete account error:", error)
      if (error.code === "auth/requires-recent-login") {
        alert("Please sign out and sign in again before deleting your account.")
      } else {
        alert("Failed to delete account. Please try again.")
      }
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  const handleExportData = () => {
    const data = {
      profile: JSON.parse(localStorage.getItem("placify_user_profile") || "{}"),
      applications: JSON.parse(localStorage.getItem("placify_applications") || "{}"),
      checklist: JSON.parse(localStorage.getItem("placify_checklist") || "{}"),
      settings: JSON.parse(localStorage.getItem("placify_settings") || "{}"),
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `placify-data-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setExportMessage("Data exported successfully!")
    setTimeout(() => setExportMessage(""), 3000)
  }

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
            <button
              onClick={() => router.push("/dashboard/profile")}
              className="rounded-lg bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              Edit
            </button>
          </div>

          <button
            onClick={() => setShowPasswordModal(true)}
            className="flex items-center justify-between rounded-xl bg-background p-4 border border-border text-left hover:bg-silk transition-colors"
          >
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

      {/* Password Modal */}
      {showPasswordModal && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-bold text-foreground">Change Password</h3>
          <div className="flex flex-col gap-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            {passwordMessage && (
              <p className={`text-xs font-medium ${passwordMessage.includes("success") ? "text-success" : "text-destructive"}`}>
                {passwordMessage}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleChangePassword}
                disabled={!currentPassword || !newPassword}
                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setShowPasswordModal(false)
                  setPasswordMessage("")
                  setCurrentPassword("")
                  setNewPassword("")
                }}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

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
              onClick={() => updateSettings({ emailNotifs: !settings.emailNotifs })}
              className={`relative h-6 w-11 rounded-full transition-colors ${settings.emailNotifs ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${settings.emailNotifs ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-background p-4 border border-border">
            <div>
              <p className="text-sm font-medium text-foreground">Push Notifications</p>
              <p className="text-xs text-muted-foreground">Get alerts for urgent deadlines</p>
            </div>
            <button
              onClick={() => updateSettings({ pushNotifs: !settings.pushNotifs })}
              className={`relative h-6 w-11 rounded-full transition-colors ${settings.pushNotifs ? "bg-primary" : "bg-muted"}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all ${settings.pushNotifs ? "left-[22px]" : "left-0.5"}`} />
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
          <button
            onClick={handleExportData}
            className="flex items-center justify-between rounded-xl bg-background p-4 border border-border text-left hover:bg-silk transition-colors"
          >
            <div className="flex items-center gap-3">
              <Download className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">Export Data</p>
                <p className="text-xs text-muted-foreground">Download your application history</p>
              </div>
            </div>
            {exportMessage ? (
              <CheckCircle2 className="h-4 w-4 text-success" />
            ) : (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
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
            onClick={handleSignOut}
            className="flex items-center gap-3 rounded-xl bg-card p-4 border border-border text-left hover:bg-silk transition-colors"
          >
            <LogOut className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Log Out</p>
              <p className="text-xs text-muted-foreground">Sign out of your account</p>
            </div>
          </button>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center gap-3 rounded-xl bg-card p-4 border border-destructive/30 text-left hover:bg-destructive/5 transition-colors"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
              <div>
                <p className="text-sm font-medium text-destructive">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
              </div>
            </button>
          ) : (
            <div className="rounded-xl border border-destructive/30 bg-card p-4">
              <p className="mb-3 text-sm font-semibold text-destructive">Are you sure? This action cannot be undone.</p>
              <p className="mb-4 text-xs text-muted-foreground">
                All your profile data, applications, and settings will be permanently deleted.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="rounded-xl bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {isDeleting ? "Deleting..." : "Yes, Delete My Account"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
