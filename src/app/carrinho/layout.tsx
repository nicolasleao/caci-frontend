import type { Metadata } from 'next'
import Header from '@/app/_components/Header/index'
import Footer from '@/app/_components/Footer'

export const metadata: Metadata = {
  title: 'caci - carrinho',
  description: 'Caci studio',
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
        <Header />
        <div className="min-h-[80vh]">
          {children}
        </div>
        <Footer />
    </div>
  )
}
