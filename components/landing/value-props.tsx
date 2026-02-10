"use client"

import { motion } from "framer-motion"
import { Database, Clock, Kanban, ChevronRight } from "lucide-react"

const features = [
  {
    icon: Database,
    title: "One Source of Truth",
    description:
      "No more WhatsApp scrolling. Every placement drive, criteria, and update in one organized feed.",
    color: "text-velvet",
    glow: "glow-velvet",
    borderColor: "border-velvet/20",
    bgAccent: "bg-velvet/10",
  },
  {
    icon: Clock,
    title: "Smart Deadlines",
    description:
      "Never miss a date. Visual urgency indicators change color as deadlines approach, so you always act in time.",
    color: "text-champagne-foreground",
    glow: "glow-champagne",
    borderColor: "border-champagne/40",
    bgAccent: "bg-champagne/30",
  },
  {
    icon: Kanban,
    title: "Application Tracker",
    description:
      "Track every application from Applied to Selected. Kanban-style status view gives you full control.",
    color: "text-primary",
    glow: "glow-velvet",
    borderColor: "border-marble/40",
    bgAccent: "bg-marble/40",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export function ValueProps() {
  return (
    <section id="features" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Why Placify
          </p>
          <h2 className="text-balance text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
            Everything you need to get placed
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            We solve the three biggest problems students face during placement
            season.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`group relative flex flex-col rounded-2xl border ${feature.borderColor} bg-card p-8 transition-all hover:border-opacity-50`}
            >
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgAccent}`}
              >
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="mb-6 flex-1 leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${feature.color} opacity-0 transition-opacity group-hover:opacity-100`}
              >
                Learn more <ChevronRight className="h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
