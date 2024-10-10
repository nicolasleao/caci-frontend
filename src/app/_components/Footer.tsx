import Image from "next/image";
import GoogleSafeBrowsing from "@/assets/img/google-safe-browsing.png";

interface FooterProps {
    showSafeBrowsing?: boolean
}

export default function Footer(props: FooterProps) {
    return (
        <footer className="bg-black text-white w-full pt-4 sm:pt-10 lg:pt-12 bottom-0">
            {props.showSafeBrowsing && (<a target="_blank" href="https://transparencyreport.google.com/safe-browsing/search?url=caci.com.br&hl=pt_BR" className="text-center">
                <Image width="200" src={GoogleSafeBrowsing} alt="Safe Browsing seal" className="mx-auto mb-6" />
            </a>)}
            <div className="pt-8 pb-4 text-center text-sm text-gray-400"> © 2024 | CACI. Todos direitos reservados. | CNPJ: 53.606.008/0001-62</div>
            <div className="pb-8 text-center text-sm text-gray-400">contato@caci.com.br</div>
        </footer>
    )
}