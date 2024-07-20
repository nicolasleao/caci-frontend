"use client"
import { useState } from "react"
import Link from "next/link"
import { Bars4Icon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import logoTransparent from "@/assets/img/logo_transparente.png"
import Image from "next/image"

export default function Header() {
    const [menuActive, setMenuActive] = useState(false)
    const [cartActive, setCartActive] = useState(false)
    const toggleMenu = () => setMenuActive(!menuActive)
    const toggleCart = () => setCartActive(!cartActive)

    const menuItems = [
        {
            name: 'Início',
            href: '/'
        },
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
            <header className="text-gray-600 body-font border-bottom border">
                <div className="mx-auto flex p-5 flex-row items-center justify-between">
                    <a href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <Image className="ml-3" src={logoTransparent} alt="Logo principal" width="100" />
                    </a>
                    <nav className="md:ml-auto flex items-center text-base justify-center invisible md:visible">
                        {menuItems.map(item => (
                            <Link key={item.href} href={item.href} className="mr-5 hover:text-gray-900">{item.name}</Link>
                        ))}
                        <button className="flex items-center text-black">
                            <ShoppingBagIcon onClick={toggleCart} className="w-[20px] mr-2 mb-1"/>(2)
                        </button>
                    </nav>
                    <button className="w-[32px] md:invisible" onClick={toggleMenu}>
                        <Bars4Icon />
                    </button>
                </div>
            </header>
            {menuActive && (
                <div className="mobile-menu w-full flex flex-col text-center md:invisible">
                    {menuItems.map(item => (
                        <Link key={item.href} href={item.href} className="mt-5 hover:text-gray-900">{item.name}</Link>
                    ))}
                    <button className="flex flex-row items-center mx-auto mt-5">
                        <ShoppingBagIcon onClick={toggleCart} className="w-[24px] mr-2 mb-1"/> Carrinho (2)
                    </button>
                </div>
            )}
        </>
    )
}