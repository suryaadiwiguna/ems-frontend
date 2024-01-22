import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Navbar from '@/app/components/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Management System',
  description: 'by Surya & Kevin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
