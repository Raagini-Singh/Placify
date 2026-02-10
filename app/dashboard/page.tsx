"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { opportunities as allOpportunities, user } from "@/lib/mock-data"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { FilterBar } from "@/components/dashboard/filter-bar"
import { OpportunityCard } from "@/components/dashboard/opportunity-card"

export default function DashboardPage() {
  const [selectedCohort, setSelectedCohort] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const upcomingDeadlines = useMemo(() => {
    const now = new Date()
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    return allOpportunities.filter((o) => o.deadline <= in24Hours && o.deadline > now)
  }, [])

  const filteredOpportunities = useMemo(() => {
    return allOpportunities.filter((opp) => {
      const matchesCohort =
        selectedCohort === "All" || opp.cohort === selectedCohort
      const matchesSearch =
        opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.role.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCohort && matchesSearch
    })
  }, [selectedCohort, searchQuery])

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-8">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Welcome back, {user.name}.
        </h1>
        <p className="mt-1 text-muted-foreground">
          You have{" "}
          <span className="font-semibold text-destructive">
            {upcomingDeadlines.length} deadline{upcomingDeadlines.length !== 1 ? "s" : ""}
          </span>{" "}
          approaching in the next 24 hours.
        </p>
      </motion.div>

      {/* Urgent banner */}
      {upcomingDeadlines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive/10">
            <AlertTriangle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Urgent: {upcomingDeadlines.length} deadline{upcomingDeadlines.length !== 1 ? "s" : ""} within 24 hours
            </p>
            <p className="text-xs text-muted-foreground">
              {upcomingDeadlines
                .map((o) => `${o.company} (${o.role})`)
                .join(", ")}
            </p>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <StatsCards opportunities={allOpportunities} />

      {/* Filter */}
      <FilterBar
        selectedCohort={selectedCohort}
        onCohortChange={setSelectedCohort}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Opportunity grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredOpportunities.map((opp, i) => (
          <OpportunityCard key={opp.id} opportunity={opp} index={i} />
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
          <p className="text-lg font-semibold text-foreground">
            No opportunities found
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
        </div>
      )}
    </div>
  )
}
