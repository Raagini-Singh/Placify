"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Crown } from "lucide-react"

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary shadow-md">
            <Crown className="h-5 w-5 text-champagne" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Plac<span className="text-primary">ify</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            How it Works
          </Link>
          <Link
            href="/companies"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Companies
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-secondary/50"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:scale-105 hover:opacity-90 glow-velvet"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
