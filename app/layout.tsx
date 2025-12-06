import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display, Dancing_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { LoadingScreenProvider } from "@/components/loading"
import "./globals.css"

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dancing",
})

export const metadata: Metadata = {
  title: "Spice Bazaar - Authentic Spices from Around the World",
  description:
    "Discover the finest spices, recipes, and cultural stories from Moroccan and Indian bazaars. Your journey into exotic flavors starts here.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfairDisplay.variable} ${dancingScript.variable}`}
        suppressHydrationWarning
      >
        <LoadingScreenProvider minDisplayTime={2500}>
          <Suspense fallback={null}>{children}</Suspense>
        </LoadingScreenProvider>
        <Analytics />
      </body>
    </html>
  )
}
