"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, MapPin, Building2, Factory, Users, ArrowLeft, Crown } from "lucide-react"
import { companies, companyTypes, industries, indianStates, cityToState } from "@/lib/mock-data"

export default function CompaniesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedState, setSelectedState] = useState("All")
  const [selectedIndustry, setSelectedIndustry] = useState("All")

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch =
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesType =
        selectedType === "All" || company.type === selectedType

      const matchesIndustry =
        selectedIndustry === "All" || company.industry === selectedIndustry

      const matchesState =
        selectedState === "All" ||
        company.locations.some(
          (loc) => cityToState[loc] === selectedState || loc === selectedState
        )

      return matchesSearch && matchesType && matchesIndustry && matchesState
    })
  }, [searchQuery, selectedType, selectedState, selectedIndustry])

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
              <Crown className="h-5 w-5 text-champagne" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Plac<span className="text-primary">ify</span>
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 glow-velvet"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-5xl" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Explore <span className="text-primary">500+</span> Companies
          </h1>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Discover companies hiring freshers. Filter by type, location, and industry to find your perfect match.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="relative md:col-span-4">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search companies..."
                className="h-11 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Company Type */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Building2 className="h-3.5 w-3.5" /> Company Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {companyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Location (State) */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <MapPin className="h-3.5 w-3.5" /> Location (State)
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry */}
            <div>
              <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <Factory className="h-3.5 w-3.5" /> Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="h-10 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {industries.map((ind) => (
                  <option key={ind} value={ind}>
                    {ind}
                  </option>
                ))}
              </select>
            </div>

            {/* Results count */}
            <div className="flex items-end">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredCompanies.length}</span> companies found
              </p>
            </div>
          </div>
        </motion.div>

        {/* Companies Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company, i) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="card-premium flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-silk border border-border overflow-hidden">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="h-7 w-7 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `<span class="text-lg font-bold text-primary">${company.name.charAt(0)}</span>`;
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{company.name}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-md bg-accent px-2 py-0.5 font-medium text-accent-foreground">
                      {company.type}
                    </span>
                    <span>{company.industry}</span>
                  </div>
                </div>
              </div>

              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {company.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {company.hiringRoles.map((role) => (
                  <span
                    key={role}
                    className="rounded-md bg-secondary/80 px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {company.locations.slice(0, 2).join(", ")}
                  {company.locations.length > 2 && ` +${company.locations.length - 2}`}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-success">Avg: {company.avgPackage}</span>
                  {company.fresherFriendly && (
                    <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                      <Users className="h-3 w-3" /> Freshers
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16">
            <Building2 className="mb-4 h-12 w-12 text-muted-foreground/40" />
            <p className="text-lg font-semibold text-foreground">
              No companies found
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
