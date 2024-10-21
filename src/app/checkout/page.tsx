"use client"

import { useState } from "react";
import PixLogo from "@/assets/img/pix-logo.svg";
import Image from "next/image";
import { debounce } from "../_utils";
import DeliveryTruckIcon from "@/assets/img/delivery-truck-icon.svg";
import GoogleSafeBrowsing from "@/assets/img/google-safe-browsing-2.png";
import Stepper from "../_components/Stepper";

export default function Checkout() {
  const [isLocal, setIsLocal] = useState(false)
  const [hasCep, setHasCep] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const callViaCep = (cep: string) => {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (typeof window !== 'undefined') {
          console.log('debounced viacep')
          document.getElementById('dex-addr')!.setAttribute('value', data.logradouro)
          document.getElementById('dex-city')!.setAttribute('value', data.localidade)
          document.getElementById('dex-state')!.setAttribute('value', data.uf)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
  const debouncedViaCep = debounce(callViaCep, 1000)

  const captureEmail = (e: any) => {
    console.log(`email capturado: ${e.target.value}`)
  }
  const debouncedCaptureEmail = debounce(captureEmail, 1000)
  const debouncedSetIsLocal = debounce(setIsLocal, 1000)

  const changeCep = (e: any) => {
    if (e.target.value.length < 8) {
      setHasCep(false)
      return
    }
    setHasCep(true)
    if (e.target.value.startsWith('570')) {
      debouncedSetIsLocal(true)
    } else {
      debouncedSetIsLocal(false)
    }
    debouncedViaCep(e.target.value)
    console.log('cep changed')
  }

  const formCaptureEmail = (e: any) => {
    debouncedCaptureEmail(e)
  }

  const validateStep = (step: number, cb: any) => {
    if (step == 1) {
      const email = document.querySelector('input[name="email"]') as HTMLInputElement
      const nome = document.querySelector('input[name="nome"]') as HTMLInputElement
      if (email.value === '' || nome.value === '') {
        alert('Preencha todos os campos obrigatórios')
        return false
      }
      return cb()
    }
    if (step == 2) {
      const cep = document.querySelector('input[name="cep"]') as HTMLInputElement
      const endereco = document.querySelector('input[name="endereco"]') as HTMLInputElement
      const numero = document.querySelector('input[name="numero"]') as HTMLInputElement
      const cidade = document.querySelector('input[name="cidade"]') as HTMLInputElement
      const estado = document.querySelector('input[name="estado"]') as HTMLInputElement
      if (cep.value === '' || endereco.value === '' || numero.value === '' || cidade.value === '' || estado.value === '') {
        alert('Preencha todos os campos obrigatórios')
        return false
      }
      return cb()
    }
    if (step == 3) {
      const cardNumber = document.querySelector('input[name="cardNumber"]') as HTMLInputElement
      const cardExp = document.querySelector('input[name="cardExp"]') as HTMLInputElement
      const cardCvv = document.querySelector('input[name="cardCvv"]') as HTMLInputElement
      if (cardNumber.value === '' || cardExp.value === '' || cardCvv.value === '') {
        alert('Preencha todos os campos obrigatórios')
        return false
      }
      return cb()
    }
  }

  const setStep = (step: number) => {
    for(let i = 1; i <= 3; i++) {
      if(i !== step) {
        document.querySelector(`#step-${i}`)!.classList.remove('visible')
        document.querySelector(`#step-${i}`)!.classList.add('hidden')
      }
    }
    document.querySelector(`#step-${step}`)!.classList.add('visible')
    document.querySelector(`#step-${step}`)!.classList.remove('hidden')
    setCurrentStep(step)
  }

  const stepperSteps = [
    {
      label: 'Dados Pessoais',
    },
    {
      label: 'Entrega',
    },
    {
      label: 'Pagamento',
    }
  ]

  return (
    <div className="mt-10">
      <div className="font-sans bg-white p-4">
      <div className="max-w-4xl mx-auto mt-24">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 inline-block border-b-[3px] border-gray-800 pb-1">Checkout</h2>
        </div>
        
        <div className="mt-24">
          <Stepper currentStep={currentStep} steps={stepperSteps} />
          <div id="step-1">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">01</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Dados Pessoais</h3>
              </div>

              <div className="md:col-span-2">
                <form>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input type="email" placeholder="Email" name="email" onChange={(e) => {formCaptureEmail(e)}}
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input type="text" placeholder="Nome" name="nome"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input type="text" placeholder="Celular (opcional)" name="celular"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-4 mt-12">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-black text-white rounded-md hover:bg-blue-700"
                onClick={() => validateStep(1, () => setStep(2))}
              >
                Continuar
              </button>
            </div>
          </div>

          <div id="step-2" className="hidden">
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">02</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Endereço de Entrega</h3>
              </div>

              <div className="md:col-span-2">
                <form>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input id="dex-cep" type="text" placeholder="CEP" onChange={(e) => {changeCep(e)}} name="cep"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input id="dex-addr" type="text" placeholder="Endereço" name="endereco"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input id="dex-num" type="text" placeholder="Número" name="numero"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input id="dex-compl" type="text" placeholder="Complemento" name="complemento"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input id="dex-city" type="text" placeholder="Cidade" name="cidade"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                    <div>
                      <input id="dex-state" type="text" placeholder="Estado" name="estado"
                        className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                    </div>
                  </div>
                </form>
              </div>
              {/* Calculadora de frete */}

              {hasCep && (
                <>
                <div className="col-span-1"></div>
                <div className="col-span-2 p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow">
                  <a href="#">
                      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 flex items-center justify-start flex-row">
                        {!isLocal && (<>
                          <Image src={DeliveryTruckIcon} alt="Delivery Icon" width="42" className="mr-2" />
                          Calculando frete
                          <div role="status" className="ml-2">
                              <svg aria-hidden="true" className="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              <span className="sr-only">Loading...</span>
                          </div>
                        </>)}

                        {isLocal && (
                          <p className="flex flex-row"><Image src={DeliveryTruckIcon} alt="Delivery Icon" width="42" className="mr-2" />Entrega Maceió: {`R$ 10,00`}</p>
                        )}
                      </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Por favor aguarde, estamos calculando o custo para envio do seu pedido!</p>
                  <a href="#" target="_blank" className="inline-flex font-medium items-center text-blue-600 hover:underline">
                      Informações sobre o envio
                      <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"/>
                      </svg>
                  </a>
                </div>
                </>
              )}

            </div>
            
            <div className="flex flex-wrap justify-end gap-4 mt-12">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-md hover:bg-gray-100"
                onClick={() => {setStep(1)}}
              >
                Voltar
              </button>
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-black text-white rounded-md hover:bg-blue-700"
                onClick={() => validateStep(2, () => setStep(3))}
              >
                Continuar
              </button>
            </div>
          </div>
          
          <div id="step-3" className="hidden">
            <div className="grid md:grid-cols-3 gap-4 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-gray-300">03</h3>
                <h3 className="text-xl font-bold text-gray-800 mt-1">Meio de Pagamento</h3>
              </div>

              <div className="md:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center">
                    <input name="selectedMethod" type="radio" className="w-5 h-5 cursor-pointer" id="card" defaultChecked />
                    <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer items-center">
                      Crédito
                      <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="card1" />
                      <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="card2" />
                      <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="card3" />
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input name="selectedMethod" type="radio" className="w-5 h-5 cursor-pointer" id="paypal" />
                    <label htmlFor="paypal" className="ml-4 flex gap-2 cursor-pointer items-center">
                      <Image src={PixLogo} className="w-20" alt="Pix Logo" />
                    </label>
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-4 mt-4">
                  <div className="col-span-2">
                    <input type="number" placeholder="Card number" name="cardNumber"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <input type="number" placeholder="EXP." name="cardExp"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <input type="number" placeholder="CVV" name="cardCvv"
                      className="px-4 py-3 bg-white text-gray-800 w-full text-sm border-2 rounded-md focus:border-blue-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-4 mt-12">
              <button
                type="button"
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-transparent border-2 text-gray-800 rounded-md hover:bg-gray-100"
                onClick={() => {setStep(2)}}
              >
                Voltar
              </button>
              <button type="button" onClick={() => validateStep(3, () => alert('Compra realizada com sucesso'))}
                className="px-6 py-3 text-sm font-semibold tracking-wide bg-black text-white rounded-md hover:bg-blue-700">Pagar Agora</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a className="mt-24" href="https://transparencyreport.google.com/safe-browsing/search?url=caci.com.br&hl=pt_BR" target="_blank"><Image width="200" src={GoogleSafeBrowsing} alt="Safe Browsing seal" className="mx-auto mb-2 mt-[140px]" /></a>
    </div>
  )
}
