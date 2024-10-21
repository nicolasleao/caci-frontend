import Link from "next/link"

export default function TopBar() {
    return (
        <a href="#register" className="fixed top-0 w-full z-50 top-bar">
            <div className="w-100 top-0 left-0 h-30 bg-black text-white text-sm p-1 sliding-text-rtl">
                <p>CADASTRE-SE E GANHE 10% OFF NA PRIMEIRA COMPRA</p>
            </div>
        </a>
    )
}