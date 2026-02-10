"use client"

import { motion } from "framer-motion"
import { Briefcase, Clock, CheckCircle, XCircle } from "lucide-react"
import type { Opportunity } from "@/lib/mock-data"

interface StatsCardsProps {
  opportunities: Opportunity[]
}

export function StatsCards({ opportunities }: StatsCardsProps) {
  const applied = opportunities.filter((o) => o.status === "applied").length
  const interviews = opportunities.filter((o) => o.status === "interview").length
  const selected = opportunities.filter((o) => o.status === "selected").length
  const rejected = opportunities.filter((o) => o.status === "rejected").length

  const stats = [
    {
      label: "Applied",
      value: applied,
      icon: Briefcase,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Interviews",
      value: interviews,
      icon: Clock,
      color: "text-neon-teal",
      bg: "bg-neon-teal/10",
    },
    {
      label: "Selected",
      value: selected,
      icon: CheckCircle,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      label: "Rejected",
      value: rejected,
      icon: XCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
        >
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg}`}
          >
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
