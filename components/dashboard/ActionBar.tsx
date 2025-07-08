"use client"

import { ExternalLink, MonitorSpeaker, ScreenShare, Tv } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionBarProps {
  isTvMode: boolean
}

export default function ActionBar({ isTvMode }: ActionBarProps) {
  const handleSuporteClick = () => {
    const url = `${window.location.origin}/?view=right&rotateDepts=suporte&tv=true&dataRefresh=20000`
    window.open(url, "_blank", "width=1920,height=1080")
  }

  const handleTelaEsquerdaClick = () => {
    // Incluindo a nova página ranking_vendas_02 na rotação da Tela 01
    const url = `${window.location.origin}/?view=left&rotateDepts=ranking_vendas,ranking_vendas_02&tv=true&viewRefresh=20000&dataRefresh=300000`
    window.open(url, "_blank", "width=1920,height=1080")
  }

  const handleTelaDireitaClick = () => {
    // Incluindo TPV e TPV Tela02 na rotação da tela direita
    const url = `${window.location.origin}/?view=right&rotateDepts=comercial_tela01,comercial_tela02,marketing_tela01,marketing_tela02,suporte,tpv,tpv_tela02&tv=true&viewRefresh=20000&dataRefresh=300000`
    window.open(url, "_blank", "width=1920,height=1080")
  }

  const handleTelaCentralClick = () => {
    const url = `${window.location.origin}/?view=center&tv=true&dataRefresh=300000`
    window.open(url, "_blank", "width=1920,height=1080")
  }

  return (
    <div className={`bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 ${isTvMode ? "py-4" : "py-3"}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center space-x-4">
          {/* Botão Suporte */}
          <Button
            onClick={handleSuporteClick}
            variant="outline"
            size={isTvMode ? "lg" : "default"}
            className="bg-blue-600 hover:bg-blue-700 border-blue-600 text-white hover:text-white transition-all duration-200"
          >
            <ExternalLink className={`${isTvMode ? "h-5 w-5" : "h-4 w-4"} mr-2`} />
            Suporte
          </Button>

          {/* Separador */}
          <div className="h-6 w-px bg-gray-700"></div>

          {/* Botão Lançar Tela Esquerda */}
          <Button
            onClick={handleTelaEsquerdaClick}
            variant="outline"
            size={isTvMode ? "lg" : "default"}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300 hover:text-white transition-all duration-200"
          >
            <MonitorSpeaker className={`${isTvMode ? "h-5 w-5" : "h-4 w-4"} mr-2`} />
            Lançar Tela 01
          </Button>

          {/* Botão Lançar Tela Direita */}
          <Button
            onClick={handleTelaDireitaClick}
            variant="outline"
            size={isTvMode ? "lg" : "default"}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300 hover:text-white transition-all duration-200"
          >
            <ScreenShare className={`${isTvMode ? "h-5 w-5" : "h-4 w-4"} mr-2`} />
            Lançar Tela 02
          </Button>

          {/* Botão Lançar Tela Central */}
          <Button
            onClick={handleTelaCentralClick}
            variant="outline"
            size={isTvMode ? "lg" : "default"}
            className="bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-300 hover:text-white transition-all duration-200"
          >
            <Tv className={`${isTvMode ? "h-5 w-5" : "h-4 w-4"} mr-2`} />
            Lançar Tela 03
          </Button>
        </div>
      </div>
    </div>
  )
}
