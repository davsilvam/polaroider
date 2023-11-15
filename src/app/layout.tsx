import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import { ReactNode } from 'react'

import '../../node_modules/cropperjs/dist/cropper.css'

import './globals.css'

const roboto = Roboto({ subsets: ['latin'], weight: ['500', '700', '900'] })

export const metadata: Metadata = {
  title: 'Polaroider',
  description: 'A simple app to create Polaroid photos.',
  openGraph: {
    siteName: 'Polaroider',
    type: 'website',
    locale: 'pt_BR',
    url: 'https://polaroider.vercel.app/og-image.png',
    images: [
      {
        url: '',
        width: 1200,
        height: 630,
        alt: 'Polaroider',
      },
    ],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
