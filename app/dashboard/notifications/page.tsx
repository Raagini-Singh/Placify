"use client"

import { motion } from "framer-motion"
import {
  Bell,
  AlertTriangle,
  FileText,
  Clock,
  Target,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Briefcase,
  Star,
} from "lucide-react"

const notifications = [
  {
    id: "1",
    type: "urgent",
    title: "Google deadline in 1.5 hours!",
    description: "Your application for Software Engineer Intern at Google is due soon. Apply now to avoid missing out.",
    time: "Just now",
    read: false,
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
  {
    id: "2",
    type: "urgent",
    title: "Amazon deadline in 3 hours",
    description: "Cloud Engineer position at Amazon closes soon. Your match percentage is 88%.",
    time: "2 min ago",
    read: false,
    icon: Clock,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    id: "3",
    type: "action",
    title: "Resume not uploaded!",
    description: "Upload your resume to improve matching and apply faster. Many companies require it for initial screening.",
    time: "1 hour ago",
    read: false,
    icon: FileText,
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    id: "4",
    type: "insight",
    title: "New opportunity matches your profile",
    description: "Razorpay posted a Backend Developer role with 84% match to your skills.",
    time: "3 hours ago",
    read: false,
    icon: Target,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: "5",
    type: "insight",
    title: "Weekly activity low",
    description: "You haven't applied to any opportunities this week. Staying active improves your placement chances.",
    time: "5 hours ago",
    read: true,
    icon: TrendingUp,
    color: "text-warning",
    bg: "bg-warning/10",
  },
  {
    id: "6",
    type: "achievement",
    title: "Achievement Unlocked: First Application!",
    description: "You submitted your first application. Keep the momentum going!",
    time: "Yesterday",
    read: true,
    icon: Star,
    color: "text-primary",
    bg: "bg-accent",
  },
  {
    id: "7",
    type: "update",
    title: "Microsoft interview scheduled",
    description: "Your SDE Intern interview at Microsoft is on Feb 15 at 10:00 AM.",
    time: "Yesterday",
    read: true,
    icon: Briefcase,
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    id: "8",
    type: "action",
    title: "Complete your profile",
    description: "Your profile is 65% complete. Add more skills and upload your resume for better matches.",
    time: "2 days ago",
    read: true,
    icon: CheckCircle2,
    color: "text-muted-foreground",
    bg: "bg-muted",
  },
]

const upcomingTargets = [
  { company: "Google", role: "SDE Intern", deadline: "1.5 hours", urgent: true },
  { company: "Amazon", role: "Cloud Engineer", deadline: "3 hours", urgent: true },
  { company: "Microsoft", role: "SDE Intern", deadline: "6 hours", urgent: false },
  { company: "Flipkart", role: "Data Analyst", deadline: "10 hours", urgent: false },
  { company: "Zomato", role: "Full Stack Dev", deadline: "15 hours", urgent: false },
]

export default function NotificationsPage() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="mx-auto max-w-4xl flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Notifications
            </h1>
            <p className="mt-1 text-muted-foreground">
              Stay on top of deadlines and opportunities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 items-center rounded-full bg-destructive/10 px-3 text-xs font-semibold text-destructive">
              {unreadCount} new
            </span>
            <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors">
              Mark all read
            </button>
          </div>
        </div>
      </motion.div>

      {/* Upcoming Targets */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Target className="h-5 w-5 text-primary" /> Upcoming Targets
        </h3>
        <div className="flex flex-col gap-2">
          {upcomingTargets.map((target) => (
            <div
              key={target.company}
              className={`flex items-center justify-between rounded-xl p-3 ${
                target.urgent ? "bg-destructive/5 border border-destructive/20" : "bg-background border border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold ${
                  target.urgent ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
                }`}>
                  {target.company.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{target.company}</p>
                  <p className="text-xs text-muted-foreground">{target.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${target.urgent ? "text-destructive" : "text-muted-foreground"}`}>
                  {target.urgent && "⚡ "}{target.deadline} left
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* All Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
      >
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
          <Bell className="h-5 w-5 text-primary" /> All Notifications
        </h3>
        <div className="flex flex-col gap-2">
          {notifications.map((notif, i) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              className={`flex items-start gap-3 rounded-xl p-4 transition-all ${
                notif.read ? "bg-background" : "bg-accent/30 border border-accent"
              }`}
            >
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${notif.bg} flex-shrink-0`}>
                <notif.icon className={`h-4 w-4 ${notif.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{notif.description}</p>
                <p className="mt-1 text-[10px] text-muted-foreground/70">{notif.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
