"use client"

import { motion } from "framer-motion"
import { UserPlus, SlidersHorizontal, Rocket } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile with your skills, CGPA, and resume. It takes less than 5 minutes.",
  },
  {
    step: "02",
    icon: SlidersHorizontal,
    title: "Get Matched",
    description:
      "Our matching engine shows you how well you fit each opportunity. Filter by role, cohort, or match percentage.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Track & Apply",
    description:
      "Apply with one click, track your status from Applied to Selected, and never miss a deadline again.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            How It Works
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Three steps to your dream placement
          </h2>
        </motion.div>

        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-border md:block" />

          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative text-center"
            >
              <div className="relative z-10 mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">
                Step {step.step}
              </span>
              <h3 className="mb-3 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
