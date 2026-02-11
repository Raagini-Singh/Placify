"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Banknote, Send, Filter, Building2, Briefcase, CheckCircle } from "lucide-react"
import { opportunities as allOpportunities, roles, companyTypes, industries } from "@/lib/mock-data"
import { MatchIndicator } from "@/components/dashboard/match-indicator"
import { DeadlineBadge } from "@/components/dashboard/deadline-badge"
import { useUserProfile } from "@/hooks/use-user-profile"
import { useApplications } from "@/hooks/use-applications"

export default function OpportunitiesPage() {
  const { calculateMatch } = useUserProfile()
  const { getApplicationStatus, updateApplicationStatus } = useApplications()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  // Add dynamic match percentages to opportunities
  const opportunitiesWithMatch = useMemo(() => {
    return allOpportunities.map((opp) => ({
      ...opp,
      matchPercentage: calculateMatch(opp.requirements),
    }))
  }, [calculateMatch])

  const filteredOpportunities = useMemo(() => {
    return opportunitiesWithMatch
      .filter((opp) => {
        const matchesSearch =
          opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.role.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesRole = selectedRole === "All" || opp.role.includes(selectedRole) || opp.cohort === selectedRole
        const matchesType = selectedType === "All" || opp.companyType === selectedType
        const matchesIndustry = selectedIndustry === "All" || opp.industry === selectedIndustry
        return matchesSearch && matchesRole && matchesType && matchesIndustry
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
  }, [opportunitiesWithMatch, searchQuery, selectedRole, selectedType, selectedIndustry])

  return (
    <div className="mx-auto max-w-6xl flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-foreground md:text-3xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Opportunities
        </h1>
        <p className="mt-1 text-muted-foreground">
          Companies matching your profile. Apply to the ones that fit you best.
        </p>
      </motion.div>

      {/* Search and filter bar */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies or roles..."
              className="h-11 w-full rounded-xl border border-border bg-card pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`flex h-11 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-all ${
              showFilters ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/30"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-3"
          >
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Briefcase className="h-3.5 w-3.5" /> Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" /> Company Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {companyTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Filter className="h-3.5 w-3.5" /> Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Results */}
      <p className="text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filteredOpportunities.length}</span> opportunities sorted by match
      </p>

      <div className="grid gap-4">
        {filteredOpportunities.map((opp, i) => (
          <motion.div
            key={opp.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="card-premium flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-silk border border-border overflow-hidden flex-shrink-0">
                {opp.logoUrl ? (
                  <img
                    src={opp.logoUrl}
                    alt={opp.company}
                    className="h-7 w-7 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-bold text-primary">${opp.company.charAt(0)}</span>`;
                    }}
                  />
                ) : (
                  <span className="text-lg font-bold text-primary">{opp.company.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-foreground">{opp.company}</h3>
                  <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                    {opp.cohort}
                  </span>
                  {opp.companyType && (
                    <span className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {opp.companyType}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{opp.role}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {opp.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Banknote className="h-3 w-3" /> {opp.salary}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {opp.requirements.slice(0, 4).map((req) => (
                    <span key={req} className="rounded-md bg-secondary/60 px-2 py-0.5 text-xs text-muted-foreground">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 sm:min-w-[180px]">
              <DeadlineBadge deadline={opp.deadline} />
              <div className="w-full">
                <p className="mb-1 text-xs text-muted-foreground">Profile Match</p>
                <MatchIndicator percentage={opp.matchPercentage} />
              </div>
              {getApplicationStatus(opp.id) ? (
                <div className="flex w-full items-center justify-center gap-2 rounded-xl bg-success/10 border border-success/20 px-4 py-2.5 text-sm font-semibold text-success">
                  <CheckCircle className="h-3.5 w-3.5" /> Applied
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => updateApplicationStatus(opp.id, "applied")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all glow-velvet"
                >
                  <Send className="h-3.5 w-3.5" /> Apply Now
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
          <Briefcase className="mb-4 h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-semibold text-foreground">No opportunities found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  )
}
