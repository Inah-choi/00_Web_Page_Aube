import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Aube | Architecting the Dawn of Intelligence",
  description:
    "Aube is an AI company translating complex data into elegant human experiences. Discover our ecosystem of intelligent solutions.",
}

export const viewport: Viewport = {
  themeColor: "#0c0d12",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
