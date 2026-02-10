import React from "react"
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 gradient-warm">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(75,46,57,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(75,46,57,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Ambient warm glow */}
      <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-champagne/30 blur-[120px]" />
      <div className="absolute right-1/4 bottom-1/4 h-[250px] w-[250px] rounded-full bg-marble/40 blur-[100px]" />

      {children}
    </div>
  )
}
