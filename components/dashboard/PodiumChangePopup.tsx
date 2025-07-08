"use client"

import { useEffect } from "react"
import { Crown, Medal, Award } from "lucide-react"

// Esta interface deve ser consistente com a usada em RankingVendas.tsx
interface Vendedor {
  id: string
  nome: string
  foto: string
  posicao: number
}

interface PodiumChangePopupProps {
  vendedor: Vendedor
  onClose: () => void
}

const getPodiumDetails = (position: number) => {
  switch (position) {
    case 1:
      return {
        Icon: Crown,
        color: "text-yellow-400",
        title: "Novo 1º Lugar!",
        bgColor: "bg-yellow-400/20 border-yellow-400",
      }
    case 2:
      return {
        Icon: Medal,
        color: "text-gray-300",
        title: "Alcançou o 2º Lugar!",
        bgColor: "bg-gray-300/20 border-gray-300",
      }
    case 3:
      return {
        Icon: Award,
        color: "text-amber-600",
        title: "Alcançou o 3º Lugar!",
        bgColor: "bg-amber-600/20 border-amber-600",
      }
    default:
      return {
        Icon: null,
        color: "",
        title: "",
        bgColor: "",
      }
  }
}

export default function PodiumChangePopup({
  vendedor,
  onClose,
}: PodiumChangePopupProps) {
  useEffect(() => {
    // O popup desaparece automaticamente após 7 segundos
    const timer = setTimeout(() => {
      onClose()
    }, 7000)

    return () => clearTimeout(timer)
  }, [onClose])

  const { Icon, color, title, bgColor } = getPodiumDetails(vendedor.posicao)

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in">
      {/* Efeito de confete apenas para o 1º lugar */}
      {vendedor.posicao === 1 && <div className="confetti-container"></div>}

      <div
        className={`relative rounded-2xl border-2 p-8 text-center shadow-2xl transform animate-zoom-in ${bgColor}`}
      >
        <div className="flex flex-col items-center">
          {Icon && <Icon className={`h-24 w-24 mb-4 ${color}`} />}
          <h2 className={`text-4xl font-bold text-white mb-2`}>{title}</h2>
          <img
            src={vendedor.foto || "/placeholder-user.jpg"}
            alt={vendedor.nome}
            className={`w-40 h-40 rounded-full border-4 my-4 ${bgColor}`}
          />
          <p className="text-5xl font-extrabold text-white drop-shadow-lg">
            {vendedor.nome}
          </p>
        </div>
        {/* Efeito de holofote para 2º e 3º lugar */}
        {vendedor.posicao > 1 && <div className="spotlight-effect"></div>}
      </div>
    </div>
  )
}
