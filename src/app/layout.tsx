import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

const GTM_ID = 'GTM-KQP5PD34'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
      <GoogleTagManager gtmId={GTM_ID} />
    </html>
  )
}
