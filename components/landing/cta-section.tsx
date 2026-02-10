"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative px-6 py-32">
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary/20 bg-card p-12 text-center md:p-16"
      >
        {/* Background glow */}
        <div className="absolute left-1/2 top-0 h-[200px] w-[400px] -translate-x-1/2 bg-primary/10 blur-[80px]" />

        <div className="relative z-10">
          <h2 className="mb-4 text-balance text-3xl font-bold text-foreground md:text-4xl">
            Ready to stop missing placements?
          </h2>
          <p className="mx-auto mb-8 max-w-md text-pretty text-muted-foreground">
            Join thousands of students who never miss a deadline. Set up your
            profile in under 5 minutes.
          </p>
          <Link
            href="/auth/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:scale-105 glow-velvet"
          >
            Get Placed Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
