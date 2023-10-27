import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'

import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['500', '700', '900'] })

export const metadata: Metadata = {
  title: 'Polaroider',
  description: 'A simple app to create Polaroid photos.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
