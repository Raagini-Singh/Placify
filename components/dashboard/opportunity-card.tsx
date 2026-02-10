"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Banknote, ChevronDown } from "lucide-react"
import type { Opportunity, ApplicationStatus } from "@/lib/mock-data"
import { DeadlineBadge } from "./deadline-badge"
import { MatchIndicator } from "./match-indicator"

interface OpportunityCardProps {
  opportunity: Opportunity
  index: number
}

const statusConfig: Record<
  ApplicationStatus,
  { label: string; color: string; bg: string }
> = {
  applied: {
    label: "Applied",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  interview: {
    label: "Interview",
    color: "text-neon-teal",
    bg: "bg-neon-teal/10",
  },
  selected: {
    label: "Selected",
    color: "text-success",
    bg: "bg-success/10",
  },
  rejected: {
    label: "Rejected",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
}

const allStatuses: ApplicationStatus[] = [
  "applied",
  "interview",
  "selected",
  "rejected",
]

export function OpportunityCard({ opportunity, index }: OpportunityCardProps) {
  const [status, setStatus] = useState(opportunity.status)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  const currentStatus = statusConfig[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/20"
    >
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-lg font-bold text-foreground">
            {opportunity.company.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {opportunity.company}
            </h3>
            <p className="text-xs text-muted-foreground">
              {opportunity.role}
            </p>
          </div>
        </div>
        <DeadlineBadge deadline={opportunity.deadline} />
      </div>

      {/* Info row */}
      <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {opportunity.location}
        </span>
        <span className="flex items-center gap-1">
          <Banknote className="h-3 w-3" />
          {opportunity.salary}
        </span>
        <span className="rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-foreground">
          {opportunity.cohort}
        </span>
      </div>

      {/* Match percentage */}
      <div className="mb-4">
        <p className="mb-1.5 text-xs text-muted-foreground">Profile Match</p>
        <MatchIndicator percentage={opportunity.matchPercentage} />
      </div>

      {/* Requirements */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {opportunity.requirements.slice(0, 3).map((req) => (
          <span
            key={req}
            className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground"
          >
            {req}
          </span>
        ))}
        {opportunity.requirements.length > 3 && (
          <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs text-muted-foreground">
            +{opportunity.requirements.length - 3}
          </span>
        )}
      </div>

      {/* Status dropdown */}
      <div className="relative mt-auto">
        <button
          type="button"
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${currentStatus.bg} ${currentStatus.color}`}
        >
          {currentStatus.label}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${showStatusMenu ? "rotate-180" : ""}`}
          />
        </button>

        {showStatusMenu && (
          <div className="absolute bottom-full left-0 z-20 mb-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg">
            {allStatuses.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s)
                  setShowStatusMenu(false)
                }}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition-colors hover:bg-secondary ${
                  status === s
                    ? statusConfig[s].color
                    : "text-muted-foreground"
                }`}
              >
                {statusConfig[s].label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
