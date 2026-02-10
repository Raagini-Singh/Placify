import Link from "next/link"
import { Crown } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-primary px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-champagne/20 shadow-sm">
            <Crown className="h-4 w-4 text-champagne" />
          </div>
          <span className="text-lg font-bold text-primary-foreground" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Plac<span className="text-champagne">ify</span>
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            How It Works
          </Link>
          <Link
            href="/companies"
            className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            Companies
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
          >
            Login
          </Link>
        </div>

        <p className="text-sm text-primary-foreground/60">
          {"© 2026 Placify. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
