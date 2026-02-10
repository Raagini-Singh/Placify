"use client"

import { motion } from "framer-motion"

interface MatchIndicatorProps {
  percentage: number
}

function getMatchColor(pct: number) {
  if (pct >= 85) return { bar: "bg-neon-teal", text: "text-neon-teal" }
  if (pct >= 70) return { bar: "bg-primary", text: "text-primary" }
  if (pct >= 50) return { bar: "bg-warning", text: "text-warning" }
  return { bar: "bg-muted-foreground", text: "text-muted-foreground" }
}

export function MatchIndicator({ percentage }: MatchIndicatorProps) {
  const colors = getMatchColor(percentage)

  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={`h-full rounded-full ${colors.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
      </div>
      <span className={`text-xs font-bold ${colors.text}`}>
        {percentage}%
      </span>
    </div>
  )
}
