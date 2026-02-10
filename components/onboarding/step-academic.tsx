"use client"

import type { ProfileData } from "./onboarding-wizard"
import { GraduationCap, BookOpen } from "lucide-react"

interface StepAcademicProps {
  data: ProfileData
  onUpdate: (data: Partial<ProfileData>) => void
}

export function StepAcademic({ data, onUpdate }: StepAcademicProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          College / University
        </label>
        <div className="relative">
          <GraduationCap className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={data.collegeName}
            onChange={(e) => onUpdate({ collegeName: e.target.value })}
            placeholder="e.g., IIT Bombay"
            className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            Degree
          </label>
          <select
            value={data.degree}
            onChange={(e) => onUpdate({ degree: e.target.value })}
            className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="" className="bg-card text-foreground">
              Select...
            </option>
            <option value="btech" className="bg-card text-foreground">
              B.Tech
            </option>
            <option value="bsc" className="bg-card text-foreground">
              B.Sc
            </option>
            <option value="bca" className="bg-card text-foreground">
              BCA
            </option>
            <option value="mtech" className="bg-card text-foreground">
              M.Tech
            </option>
            <option value="msc" className="bg-card text-foreground">
              M.Sc
            </option>
            <option value="mca" className="bg-card text-foreground">
              MCA
            </option>
            <option value="mba" className="bg-card text-foreground">
              MBA
            </option>
          </select>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            CGPA
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            value={data.cgpa}
            onChange={(e) => onUpdate({ cgpa: e.target.value })}
            placeholder="8.5"
            className="h-11 w-full rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Minor / Specialization
        </label>
        <div className="relative">
          <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={data.specialization}
            onChange={(e) => onUpdate({ specialization: e.target.value })}
            placeholder="e.g., Cybersecurity, AI/ML"
            className="h-11 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  )
}
