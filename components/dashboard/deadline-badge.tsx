"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Clock } from "lucide-react"

interface DeadlineBadgeProps {
  deadline: Date
}

function getTimeLeft(deadline: Date) {
  const now = new Date()
  const diff = deadline.getTime() - now.getTime()

  if (diff <= 0) return { text: "Expired", hours: 0 }

  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

  if (hours >= 24) {
    const days = Math.floor(hours / 24)
    return { text: `${days}d ${hours % 24}h left`, hours }
  }

  return { text: `${hours}h ${minutes}m left`, hours }
}

function getUrgencyStyle(hours: number) {
  if (hours > 24) {
    return {
      bg: "bg-neon-teal/10",
      text: "text-neon-teal",
      border: "border-neon-teal/20",
      pulse: false,
    }
  }
  if (hours > 12) {
    return {
      bg: "bg-neon-teal/10",
      text: "text-neon-teal",
      border: "border-neon-teal/20",
      pulse: false,
    }
  }
  if (hours > 2) {
    return {
      bg: "bg-warning/10",
      text: "text-warning",
      border: "border-warning/20",
      pulse: false,
    }
  }
  return {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/20",
    pulse: true,
  }
}

export function DeadlineBadge({ deadline }: DeadlineBadgeProps) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(deadline))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [deadline])

  const urgency = getUrgencyStyle(timeLeft.hours)

  const badge = (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-semibold ${urgency.bg} ${urgency.text} ${urgency.border}`}
    >
      <Clock className="h-3 w-3" />
      {timeLeft.text}
    </span>
  )

  if (urgency.pulse) {
    return (
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {badge}
      </motion.div>
    )
  }

  return badge
}
