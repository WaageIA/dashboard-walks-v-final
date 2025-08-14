"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Crown, Target } from "lucide-react"
import type { Vendedor } from "@/types/dashboard"

interface RankingVendasProps {
  isTvMode: boolean
  vendedores: Vendedor[]
  rotationBlocked?: boolean
}

export default function RankingVendas({ isTvMode, vendedores = [], rotationBlocked = false }: RankingVendasProps) {
  // Funções de ajuda para a UI (sem alterações)
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getPodiumIcon = (position: number) => {
    const iconClass = isTvMode ? "h-8 w-8" : "h-6 w-6"
    switch (position) {
      case 1: return <Crown className={`${iconClass} text-yellow-400`} />
      case 2: return <Medal className={`${iconClass} text-gray-300`} />
      case 3: return <Award className={`${iconClass} text-amber-600`} />
      default: return <Trophy className={`${iconClass} text-gray-500`} />
    }
  }

  const getPodiumColors = (position: number) => {
    switch (position) {
      case 1: return { bg: "bg-gradient-to-br from-yellow-400/30 to-yellow-700/20", border: "border-yellow-400/40", text: "text-yellow-400", glow: "shadow-yellow-400/20" }
      case 2: return { bg: "bg-gradient-to-br from-gray-300/30 to-gray-500/20", border: "border-gray-300/40", text: "text-gray-300", glow: "shadow-gray-300/20" }
      case 3: return { bg: "bg-gradient-to-br from-amber-600/30 to-amber-800/20", border: "border-amber-600/40", text: "text-amber-600", glow: "shadow-amber-600/20" }
      default: return { bg: "bg-gray-800/90", border: "border-gray-700", text: "text-gray-400", glow: "shadow-none" }
    }
  }

  const getAdaptivePodiumHeight = (othersCount: number, position: number, isTvMode: boolean) => {
    const baseHeights = { 1: isTvMode ? "h-80" : "h-72", 2: isTvMode ? "h-72" : "h-64", 3: isTvMode ? "h-72" : "h-64" }
    if (othersCount <= 4) return baseHeights[position as keyof typeof baseHeights]
    const adaptiveHeights = {
      5: { 1: "h-88", 2: "h-80", 3: "h-80" },
      6: { 1: "h-96", 2: "h-88", 3: "h-88" },
      7: { 1: "h-104", 2: "h-96", 3: "h-96" },
      8: { 1: "h-112", 2: "h-104", 3: "h-104" },
    }
    const heightConfig = adaptiveHeights[Math.min(othersCount, 8) as keyof typeof adaptiveHeights]
    return heightConfig[position as keyof typeof heightConfig] || baseHeights[position as keyof typeof baseHeights]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Superou": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Próximo": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Abaixo": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return "bg-green-500"
    if (percentage >= 80) return "bg-yellow-500"
    return "bg-red-500"
  }

  const topThree = vendedores.slice(0, 3)
  const others = vendedores.slice(3, 9)
  const leftColumn = others.slice(0, Math.ceil(others.length / 2))
  const rightColumn = others.slice(Math.ceil(others.length / 2))

  // Detecta cenários de vendas
  const allSalesZero = vendedores.every(v => v.vendas === 0)
  const vendedoresComVendas = vendedores.filter(v => v.vendas > 0).length

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <Trophy className={`text-yellow-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            {allSalesZero ? "🚀 Ranking de Vendas - Aguardando Primeiras Vendas!" : "Ranking de Vendas do Mês"}
          </h2>
          <Trophy className={`text-yellow-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
        </div>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          {allSalesZero ? "🎯 O mês está começando - Vamos às vendas! 🎯" : "🏆 Competição do mês - Atualizado em tempo real! 🏆"}
        </p>
      </div>

      {/* Pódio */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-15 ${isTvMode ? "gap-8" : ""}`}>
        {/* 2º Lugar */}
        {topThree[1] && (
          <div className="order-1 md:order-1">
            <Card className={`!bg-transparent ${getPodiumColors(2).bg} ${getPodiumColors(2).border} border-2 shadow-2xl ${getPodiumColors(2).glow} hover:scale-105 transition-all duration-300 ${getAdaptivePodiumHeight(others.length, 2, isTvMode)}`}>
              <CardContent className={`p-6 text-center ${isTvMode ? "p-8" : ""} h-full flex flex-col justify-center`}>
                {(allSalesZero || vendedoresComVendas < 2) ? (
                  <div className="animate-pulse">
                    <div className="flex justify-center mb-6">
                      <Medal className={`${isTvMode ? "h-16 w-16" : "h-12 w-12"} text-gray-300`} />
                    </div>
                    <h3 className={`font-bold text-white ${isTvMode ? "text-2xl" : "text-xl"}`}>🥈 Aguardando o Vice</h3>
                    <p className={`text-gray-400 mt-2 ${isTvMode ? "text-lg" : "text-base"}`}>2º Lugar</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-center mb-4">{getPodiumIcon(2)}</div>
                      <div className="relative mb-4">
                        <img src={topThree[1].foto || "/placeholder.svg?height=100&width=100"} alt={topThree[1].nome} className={`mx-auto rounded-full border-4 ${getPodiumColors(2).border} ${isTvMode ? "w-24 h-24" : "w-20 h-20"}`} />
                        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-800 ${isTvMode ? "w-10 h-10 text-lg" : "text-sm"}`}>2</div>
                      </div>
                      <h3 className={`font-bold text-white mb-2 ${isTvMode ? "text-xl" : "text-lg"}`}>{topThree[1].nome}</h3>
                    </div>
                    <div>
                      <div className={`${getPodiumColors(2).text} font-bold mb-2 ${isTvMode ? "text-xl" : "text-lg"}`}>{formatCurrency(topThree[1].vendas)}</div>
                      <Badge className={`${getStatusColor(topThree[1].status)} ${isTvMode ? "text-sm" : "text-xs"}`}>{topThree[1].percentual}% da meta</Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 1º Lugar */}
        {topThree[0] && (
          <div className="order-2 md:order-2">
            <Card className={`!bg-transparent ${getPodiumColors(1).bg} ${getPodiumColors(1).border} border-4 shadow-2xl ${getPodiumColors(1).glow} hover:scale-105 transition-all duration-300 ${getAdaptivePodiumHeight(others.length, 1, isTvMode)} min-h-[370px] flex flex-col justify-between`}>
              <CardContent className={`p-6 text-center ${isTvMode ? "p-10" : ""} h-full flex flex-col justify-center`}>
                {allSalesZero ? (
                  <div className="animate-pulse">
                    <div className="flex justify-center mb-6">
                      <Crown className={`${isTvMode ? "h-20 w-20" : "h-16 w-16"} text-yellow-400`} />
                    </div>
                    <h3 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>🏆 Aguardando o Campeão</h3>
                    <p className={`text-gray-400 mt-2 ${isTvMode ? "text-xl" : "text-lg"}`}>1º Lugar</p>
                    <div className={`mt-4 text-yellow-400 font-semibold ${isTvMode ? "text-lg" : "text-base"}`}>🌟 FUTURO CAMPEÃO DO MÊS 🌟</div>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-center mb-4">{getPodiumIcon(1)}</div>
                      <div className="relative mb-4">
                        <img src={topThree[0].foto || "/placeholder.svg?height=120&width=120"} alt={topThree[0].nome} className={`mx-auto rounded-full border-4 ${getPodiumColors(1).border} ${isTvMode ? "w-32 h-32" : "w-24 h-24"}`} />
                        <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-gray-900 ${isTvMode ? "w-12 h-12 text-xl" : "text-lg"}`}>1</div>
                      </div>
                      <h3 className={`font-bold text-white mb-2 ${isTvMode ? "text-2xl" : "text-xl"}`}>👑 {topThree[0].nome}</h3>
                    </div>
                    <div>
                      <div className={`${getPodiumColors(1).text} font-bold mb-2 ${isTvMode ? "text-2xl" : "text-xl"}`}>{formatCurrency(topThree[0].vendas)}</div>
                      <Badge className={`${getStatusColor(topThree[0].status)} ${isTvMode ? "text-base px-4 py-2" : "text-sm"}`}>🏆 {topThree[0].percentual}% da meta</Badge>
                    </div>
                    <div className={`mt-2 text-yellow-400 font-semibold w-full text-center ${isTvMode ? "text-lg" : "text-sm"}`}>🌟 CAMPEÃO DO MÊS 🌟</div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 3º Lugar */}
        {topThree[2] && (
          <div className="order-3 md:order-3">
            <Card className={`!bg-transparent ${getPodiumColors(3).bg} ${getPodiumColors(3).border} border-2 shadow-2xl ${getPodiumColors(3).glow} hover:scale-105 transition-all duration-300 ${getAdaptivePodiumHeight(others.length, 3, isTvMode)}`}>
              <CardContent className={`p-6 text-center ${isTvMode ? "p-8" : ""} h-full flex flex-col justify-center`}>
                {(allSalesZero || vendedoresComVendas < 3) ? (
                  <div className="animate-pulse">
                    <div className="flex justify-center mb-6">
                      <Award className={`${isTvMode ? "h-16 w-16" : "h-12 w-12"} text-amber-600`} />
                    </div>
                    <h3 className={`font-bold text-white ${isTvMode ? "text-2xl" : "text-xl"}`}>🥉 Aguardando o 3º Lugar</h3>
                    <p className={`text-gray-400 mt-2 ${isTvMode ? "text-lg" : "text-base"}`}>3º Lugar</p>
                  </div>
                ) : (
                  <>
                    <div>
                      <div className="flex justify-center mb-4">{getPodiumIcon(3)}</div>
                      <div className="relative mb-4">
                        <img src={topThree[2].foto || "/placeholder.svg?height=100&width=100"} alt={topThree[2].nome} className={`mx-auto rounded-full border-4 ${getPodiumColors(3).border} ${isTvMode ? "w-24 h-24" : "w-20 h-20"}`} />
                        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white ${isTvMode ? "w-10 h-10 text-lg" : "text-sm"}`}>3</div>
                      </div>
                      <h3 className={`font-bold text-white mb-2 ${isTvMode ? "text-xl" : "text-lg"}`}>{topThree[2].nome}</h3>
                    </div>
                    <div>
                      <div className={`${getPodiumColors(3).text} font-bold mb-2 ${isTvMode ? "text-xl" : "text-lg"}`}>{formatCurrency(topThree[2].vendas)}</div>
                      <Badge className={`${getStatusColor(topThree[2].status)} ${isTvMode ? "text-sm" : "text-xs"}`}>{topThree[2].percentual}% da meta</Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Demais Competidores */}
      <Card className="bg-gray-900/50 border-gray-800 px-4 pb-4 pt-2">
        <CardHeader>
          <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-2xl" : "text-xl"}`}>
            <Target className={isTvMode ? "h-8 w-8" : "h-6 w-6"} />
            Demais Competidores (4º ao 9º)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {others.length === 0 ? (
            <div className="text-center py-8"><p className="text-gray-400 text-lg">Nenhum competidor adicional para exibir.</p></div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="space-y-3">
                {leftColumn.map((member) => (
                  <div key={member.id} className="flex items-center p-3 rounded-lg bg-gray-800/50 border border-yellow-600/30 hover:bg-gray-800/70 transition-all duration-200">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-yellow-400 ${isTvMode ? "w-14 h-14 text-lg" : "text-base"}`}>{member.posicao}</div>
                      <img src={member.foto || "/placeholder.svg?height=50&width=50"} alt={member.nome} className={`rounded-full border-2 border-gray-600 ${isTvMode ? "w-12 h-12" : "w-10 h-10"}`} />
                      <div className="flex-1">
                        <h4 className={`font-semibold text-white mb-1 ${isTvMode ? "text-lg" : "text-base"}`}>{member.nome}</h4>
                        <div className={`text-gray-400 mb-2 ${isTvMode ? "text-base" : "text-sm"}`}>META: {formatCurrency(member.meta)}</div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${getProgressColor(member.percentual)} transition-all duration-500`} style={{ width: `${Math.min(member.percentual, 100)}%` }} />
                          </div>
                          <span className={`font-bold text-yellow-400 ${isTvMode ? "text-base" : "text-sm"}`}>{member.percentual}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-white ${isTvMode ? "text-base" : "text-sm"}`}>VENDAS</div>
                        <div className={`font-bold text-yellow-400 ${isTvMode ? "text-lg" : "text-base"}`}>{Math.floor(member.vendas / 1000)}k</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {rightColumn.map((member) => (
                  <div key={member.id} className="flex items-center p-3 rounded-lg bg-gray-800/50 border border-yellow-600/30 hover:bg-gray-800/70 transition-all duration-200">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center font-bold text-yellow-400 ${isTvMode ? "w-14 h-14 text-lg" : "text-base"}`}>{member.posicao}</div>
                      <img src={member.foto || "/placeholder.svg?height=50&width=50"} alt={member.nome} className={`rounded-full border-2 border-gray-600 ${isTvMode ? "w-12 h-12" : "w-10 h-10"}`} />
                      <div className="flex-1">
                        <h4 className={`font-semibold text-white mb-1 ${isTvMode ? "text-lg" : "text-base"}`}>{member.nome}</h4>
                        <div className={`text-gray-400 mb-2 ${isTvMode ? "text-base" : "text-sm"}`}>META: {formatCurrency(member.meta)}</div>
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                            <div className={`h-1.5 rounded-full ${getProgressColor(member.percentual)} transition-all duration-500`} style={{ width: `${Math.min(member.percentual, 100)}%` }} />
                          </div>
                          <span className={`font-bold text-yellow-400 ${isTvMode ? "text-base" : "text-sm"}`}>{member.percentual}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold text-white ${isTvMode ? "text-base" : "text-sm"}`}>VENDAS</div>
                        <div className={`font-bold text-yellow-400 ${isTvMode ? "text-lg" : "text-base"}`}>{Math.floor(member.vendas / 1000)}k</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
