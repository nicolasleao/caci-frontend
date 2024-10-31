"use client"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/lib/hooks/redux"
import { openCart } from "@/lib/features/ui/ui.slice"
import Link from "next/link"
import { Bars4Icon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import logoTransparent from "@/assets/img/logo_transparente.png"
import Image from "next/image"
import { useWindowScroll } from "@/lib/hooks/responsiveness"
import ShoppingBag from "@/app/_components/ShoppingBag"

export default function Header() {
    const dispatch = useAppDispatch()
    const [menuActive, setMenuActive] = useState(false)
    const cartData = useAppSelector(state => state.cart)
    const toggleMenu = () => setMenuActive(!menuActive)
    
    const openCartLocal = () => {
        dispatch(openCart())
    }

    const scrollY = useWindowScroll()

    const menuItems = [
        {
            name: 'Shop',
            href: '/produtos'
        },
        {
            name: 'Sobre',
            href: '/sobre'
        },
    ]
    
    return (
        <>
            <header className={`${scrollY >= 30 ? 'scroll' : ''} caci-header text-gray-600 body-font border-bottom mx-auto fixed bg-white w-full border-b border-gray-100`}>
                <div className={`caci-header-inner mx-auto flex p-5 flex-row items-center justify-between ${scrollY >= 30 ? 'h-[55px]' : 'h-[55px]'}`}>
                    <a href="/" className="flex title-font font-medium items-center text-gray-900 md:mb-0">
                        <Image className="ml-3" src={logoTransparent} alt="Logo principal" width="92" />
                    </a>
                    <nav className="md:ml-auto flex items-center text-base justify-center invisible md:visible">
                        {menuItems.map(item => (
                            <Link key={item.href} href={item.href} className="mr-5 hover:text-gray-900">{item.name}</Link>
                        ))}
                        <button onClick={openCartLocal} className="flex items-center text-black cursor-pointer">
                            <ShoppingBagIcon className="w-[20px] mr-2 mb-1"/>({cartData?.items?.length || 0})
                        </button>
                    </nav>
                    <button className="w-[32px] md:invisible" onClick={toggleMenu}>
                        <Bars4Icon />
                    </button>
                </div>
            </header>
            {menuActive && (
                <div className={`mobile-menu w-full flex flex-col text-center md:invisible fixed bg-white border-b border-gray-100 ${scrollY > 30 ? 'top-8' : 'top-20'}`}>
                    {menuItems.map(item => (
                        <Link key={item.href} href={item.href} className="mt-5 hover:text-gray-900">{item.name}</Link>
                    ))}
                    <button onClick={openCartLocal} className="flex flex-row items-center mx-auto mt-5 mb-4">
                        <ShoppingBagIcon className="w-[24px] mr-2 mb-1"/> Carrinho ({cartData?.items?.length || 0})
                    </button>
                </div>
            )}
            <ShoppingBag />
        </>
    )
}