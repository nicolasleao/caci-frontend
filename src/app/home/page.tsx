import Link from "next/link"
import banner from "@/assets/img/home/banner_01.jpg"
import vertical1 from "@/assets/img/home/vertical_01.jpg"
import vertical2 from "@/assets/img/home/vertical_02.jpg"
import Image from "next/image"

import cursivaBranca from "@/assets/img/caci-cursivo.jpg"
import seagulls from "@/assets/img/caci-seagulls.jpg"
import cloudyPreta from "@/assets/img/caci-cloudy.jpg"

import SubscribeModal from "../_components/SubscribeModal"


export default function Home() {
  return (
    <div>
      <div className="w-full h-dvh mt-20">
        <Link href="/produtos">
          <Image src={banner} alt="Foto Close da CACI Lisa Branca" className="object-cover" />
        </Link>
      </div>
      <Link href="/produtos">
        <div className="w-full flex h-50vh">
            <Image src={vertical1} alt="Foto Close da CACI Lisa Branca" className="w-1/2 py-1 pr-1 pl-1 md:py-10 md:pr-5 md:pl-10" />
            <Image src={vertical2} alt="Foto Close da CACI Lisa Branca" className="w-1/2 py-1 pr-1 pl-1 md:py-10 md:pl-5 md:pr-10" />
        </div>
      </Link>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">EM DESTAQUE</h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <Link href="/produtos/1">
              <div className="group relative text-center">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
                  <Image src={cursivaBranca} alt="" />
                </div>
                  <p>caci_cursive_001</p><p><strong>R$ 149,00</strong></p>
              </div>
            </Link>

            <Link href="/produtos/3">
              <div className="group relative text-center">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
                  <Image src={seagulls} alt="" />
                </div>
                  <p>caci_seagulls_001</p><p><strong>R$ 149,00</strong></p>
              </div>
            </Link>

            <Link href="/produtos/2">
              <div className="group relative text-center">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-120">
                  <Image src={cloudyPreta} alt="" />
                </div>
                  <p>caci_cloudy_001</p><p><strong>R$ 149,00</strong></p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <SubscribeModal />
    </div>
  )
}