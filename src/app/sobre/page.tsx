import caciClose from "@/assets/img/caci-basic-white-close.webp"
import Image from "next/image"

export default function About() {
  return (
    <div>
        <div className="mx-auto">
          <p className="max-w-[800px] mx-auto text-5xl mt-12">Sobre</p>
          <p className="max-w-[800px] mt-12 text-lg mx-auto text-gray-700">A <b>CACI</b> representa uma proposta inovadora que busca a sinergia entre Haute Couture e Streetwear, transcendendo as fronteiras entre a moda urbana e a alta costura.</p>
        
          <div className="flex mt-12 max-w-[1100px] mx-auto">
            <Image src={caciClose} alt="Foto Close da CACI Lisa Branca" className="w-1/2" />
            <div className="w-1/2 m-8 text-lg text-gray-500">
              <p className="text-3xl mb-8 text-black">Compromisso com a qualidade</p>
              <p>
                O estilo de vida CACI revolve ao redor da auto-expressão e da ruptura de padrões.
              </p>
              <p>
                Temos o compromisso de criar peças inovadoras e atuais da mais alta qualidade de costura, fabricação e expressão por um preço justo. Não somos uma marca de streetwear de luxo, somos a voz da alta moda na rua, e a voz da rua na alta moda.
              </p>
            </div>
          </div>

        </div>
    </div>
  )
}