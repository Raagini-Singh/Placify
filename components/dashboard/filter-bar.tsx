"use client"

import { Search } from "lucide-react"
import { cohorts } from "@/lib/mock-data"

interface FilterBarProps {
  selectedCohort: string
  onCohortChange: (cohort: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function FilterBar({
  selectedCohort,
  onCohortChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search */}
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search companies or roles..."
          className="h-10 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Cohort filter tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-secondary/50 p-1">
        {cohorts.map((cohort) => (
          <button
            key={cohort}
            type="button"
            onClick={() => onCohortChange(cohort)}
            className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
              selectedCohort === cohort
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {cohort}
          </button>
        ))}
      </div>
    </div>
  )
}
