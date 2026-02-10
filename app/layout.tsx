import React from "react"
import type { Metadata, Viewport } from 'next'
import { Poppins, Inter } from 'next/font/google'

import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Placify - Never Miss a Placement Again',
  description: 'Your smart placement tracking platform. Track deadlines, manage applications, and land your dream role.',
}

export const viewport: Viewport = {
  themeColor: '#F8F6F0',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  )
}
