"use client"

import { useMemo } from "react"
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
  Code2,
  Trophy,
} from "lucide-react"
import { useNotifications } from "@/hooks/use-notifications"
import { opportunities } from "@/lib/mock-data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  Clock,
  FileText,
  Target,
  TrendingUp,
  CheckCircle2,
  Briefcase,
  Star,
  Code2,
  Trophy,
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, refresh } = useNotifications()

  // Generate upcoming targets from opportunities sorted by deadline
  const upcomingTargets = useMemo(() => {
    const now = new Date()
    return opportunities
      .filter((opp) => new Date(opp.deadline) > now)
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 5)
      .map((opp) => {
        const deadline = new Date(opp.deadline)
        const hoursLeft = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60)
        let timeStr: string
        if (hoursLeft < 1) {
          timeStr = `${Math.round(hoursLeft * 60)} minutes`
        } else if (hoursLeft < 24) {
          timeStr = `${hoursLeft.toFixed(1)} hours`
        } else {
          timeStr = `${Math.round(hoursLeft / 24)} days`
        }
        return {
          company: opp.company,
          role: opp.role,
          deadline: timeStr,
          urgent: hoursLeft <= 6,
        }
      })
  }, [])

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
            {unreadCount > 0 && (
              <span className="flex h-7 items-center rounded-full bg-destructive/10 px-3 text-xs font-semibold text-destructive">
                {unreadCount} new
              </span>
            )}
            <button
              onClick={markAllAsRead}
              className="rounded-lg px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
            >
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
          {upcomingTargets.length > 0 ? (
            upcomingTargets.map((target) => (
              <div
                key={`${target.company}-${target.role}`}
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
            ))
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">No upcoming deadlines.</p>
          )}
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
          {notifications.length > 0 ? (
            notifications.map((notif, i) => {
              const IconComponent = iconMap[notif.iconName] || Bell
              return (
                <motion.div
                  key={notif.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={`flex items-start gap-3 rounded-xl p-4 transition-all cursor-pointer ${
                    notif.read ? "bg-background" : "bg-accent/30 border border-accent"
                  }`}
                  onClick={() => markAsRead(notif.id)}
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${notif.bg} flex-shrink-0`}>
                    <IconComponent className={`h-4 w-4 ${notif.color}`} />
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
              )
            })
          ) : (
            <div className="flex flex-col items-center py-8">
              <Bell className="h-10 w-10 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-foreground">You&apos;re all caught up!</p>
              <p className="text-xs text-muted-foreground">No notifications at the moment.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
