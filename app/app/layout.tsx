import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dino Dig Explorer',
  description: 'Explore dinosaurs and learn fun facts!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
