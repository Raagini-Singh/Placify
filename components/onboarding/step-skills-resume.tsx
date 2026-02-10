"use client"

import React from "react"

import { useState, useCallback } from "react"
import type { ProfileData } from "./onboarding-wizard"
import { X, Plus, Upload, FileText } from "lucide-react"

interface StepSkillsResumeProps {
  data: ProfileData
  onUpdate: (data: Partial<ProfileData>) => void
}

export function StepSkillsResume({ data, onUpdate }: StepSkillsResumeProps) {
  const [skillInput, setSkillInput] = useState("")
  const [isDragOver, setIsDragOver] = useState(false)

  const addSkill = () => {
    const trimmed = skillInput.trim()
    if (trimmed && !data.skills.includes(trimmed)) {
      onUpdate({ skills: [...data.skills, trimmed] })
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    onUpdate({ skills: data.skills.filter((s) => s !== skill) })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file && file.type === "application/pdf") {
        onUpdate({ resumeFile: file })
      }
    },
    [onUpdate],
  )

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onUpdate({ resumeFile: file })
    }
  }

  const suggestedSkills = [
    "React",
    "Python",
    "Java",
    "SQL",
    "Cybersecurity",
    "Machine Learning",
    "Node.js",
    "AWS",
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Skills section */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Skills
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a skill and press Enter"
            className="h-11 flex-1 rounded-xl border border-border bg-secondary/50 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={addSkill}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-all hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {/* Skill tags */}
        {data.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill}
                className="flex items-center gap-1.5 rounded-lg bg-primary/15 px-3 py-1.5 text-xs font-medium text-primary"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-primary/60 transition-colors hover:text-primary"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Suggestions */}
        <div className="mt-3">
          <p className="mb-2 text-xs text-muted-foreground">
            Popular skills:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {suggestedSkills
              .filter((s) => !data.skills.includes(s))
              .slice(0, 5)
              .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() =>
                    onUpdate({ skills: [...data.skills, skill] })
                  }
                  className="rounded-lg border border-border bg-secondary/30 px-2.5 py-1 text-xs text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
                >
                  {"+ "}
                  {skill}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Resume upload */}
      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
          Resume (PDF)
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragOver(true)
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-all ${
            isDragOver
              ? "border-primary bg-primary/5"
              : data.resumeFile
                ? "border-neon-teal/30 bg-neon-teal/5"
                : "border-border bg-secondary/20"
          }`}
        >
          {data.resumeFile ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-teal/10">
                <FileText className="h-5 w-5 text-neon-teal" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {data.resumeFile.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(data.resumeFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={() => onUpdate({ resumeFile: null })}
                className="ml-2 text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
              <p className="mb-1 text-sm font-medium text-foreground">
                Drag & drop your resume
              </p>
              <p className="mb-3 text-xs text-muted-foreground">
                or click to browse (PDF only)
              </p>
              <label className="cursor-pointer rounded-lg bg-secondary px-4 py-2 text-xs font-medium text-foreground transition-all hover:bg-secondary/80">
                Browse Files
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
