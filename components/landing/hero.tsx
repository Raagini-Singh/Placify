"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-20">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(75,46,57,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(75,46,57,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Ambient warm glow */}
      <div className="absolute left-1/2 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-champagne/20 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-marble/30 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-silk/80 px-4 py-1.5 shadow-sm"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Built for students, by students
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-shadow-soft"
        >
          Chaos leads to{" "}
          <span className="text-primary">missed chances.</span>
          <br />
          Meet{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Placify.</span>
            <span className="absolute -bottom-1 left-0 h-3 w-full bg-champagne/60 md:-bottom-2 md:h-4" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Stop scrolling through WhatsApp groups for placement updates. Track
          every opportunity, every deadline, every application — all in one
          place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/auth/signup"
            className="group flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:scale-105 glow-velvet"
          >
            Get Placed
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="#features"
            className="flex items-center gap-2 rounded-xl border border-border bg-silk/80 px-8 py-3.5 text-base font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-marble/50 shadow-sm"
          >
            See How It Works
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8 rounded-2xl border border-border bg-silk/80 p-6 shadow-sm backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="text-2xl font-bold text-primary md:text-3xl">2k+</p>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Students Placed
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success md:text-3xl">
              500+
            </p>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              Companies
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent-foreground md:text-3xl">
              98%
            </p>
            <p className="mt-1 text-xs text-muted-foreground md:text-sm">
              On-Time Apps
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
