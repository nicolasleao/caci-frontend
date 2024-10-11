import type { Metadata } from 'next'
import TopBar from '../_components/TopBar'
import Header from '@/app/_components/Header/index'
import Footer from '@/app/_components/Footer'

export const metadata: Metadata = {
  title: 'caci - sobre',
  description: 'Caci studio',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <TopBar />
        <Header />
        <div className="min-h-[80vh] mt-[132px]">
          {children}
        </div>
        <Footer />
    </div>
  )
}
