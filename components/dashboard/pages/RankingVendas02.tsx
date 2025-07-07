"use client"

import { useState, useEffect, useCallback } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  Trophy,
  Target,
  Calendar,
  CalendarDays,
  CalendarRange,
  Crown,
  Medal,
  Award,
  AlertCircle,
} from "lucide-react"

// 1. Interface para os dados processados que o componente usará
// Corresponde ao que a RPC get_performance_por_periodo retorna
interface VendedorPerformance {
  id: string
  name: string
  photo: string
  salesMonth: number
  salesWeek: number
  salesToday: number
  meta: number
  percentage: number
  status: "Superou" | "Próximo" | "Abaixo"
}

interface RankingVendas02Props {
  isTvMode: boolean
}

export default function RankingVendas02({ isTvMode }: RankingVendas02Props) {
  const [vendedores, setVendedores] = useState<VendedorPerformance[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 2. Função para processar dados da RPC
  const processVendedores = useCallback((data: any[]): VendedorPerformance[] => {
    return data.map((v) => {
      const percentage = v.meta > 0 ? Math.round((v.vendas_mes / v.meta) * 100) : 0
      let status: "Superou" | "Próximo" | "Abaixo"
      if (percentage >= 100) {
        status = "Superou"
      } else if (percentage >= 80) {
        status = "Próximo"
      } else {
        status = "Abaixo"
      }
      // Mapeia os campos da RPC para os nomes que o componente espera
      return {
        id: v.id,
        name: v.nome,
        photo: v.foto,
        salesMonth: v.vendas_mes,
        salesWeek: v.vendas_semana,
        salesToday: v.vendas_hoje,
        meta: v.meta,
        percentage,
        status,
      }
    })
  }, [])

  // 3. Função para buscar os dados chamando a nova RPC
  const fetchPerformance = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.rpc("get_performance_por_periodo")

      if (error) {
        console.error("Erro ao chamar RPC get_performance_por_periodo:", error)
        throw new Error("A função para calcular a performance falhou.")
      }

      if (data) {
        const processedData = processVendedores(data)
        setVendedores(processedData)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [processVendedores])

  // 4. useEffect para busca inicial e listener de Realtime
  useEffect(() => {
    fetchPerformance()

    const channel = supabase
      .channel("performance_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "registros_vendas" },
        (payload) => {
          console.log("Nova venda detectada! Atualizando performance...", payload)
          fetchPerformance()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchPerformance])

  // --- O restante do código do componente (lógica de UI) permanece o mesmo ---

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Superou": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Próximo": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Abaixo": return "bg-red-500/20 text-red-400 border-red-500/30"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getAdaptivePodiumHeight = (othersCount: number, position: number, isTvMode: boolean) => {
    const baseHeights = { 1: isTvMode ? "h-80" : "h-72", 2: isTvMode ? "h-72" : "h-64", 3: isTvMode ? "h-72" : "h-64" }
    if (othersCount <= 4) return baseHeights[position as keyof typeof baseHeights]
    const adaptiveHeights = {
      5: { 1: "h-80", 2: "h-72", 3: "h-72" },
      6: { 1: "h-96", 2: "h-80", 3: "h-80" },
      7: { 1: "h-96", 2: "h-80", 3: "h-80" },
      8: { 1: "h-96", 2: "h-80", 3: "h-80" },
    }
    const heightConfig = adaptiveHeights[Math.min(othersCount, 8) as keyof typeof adaptiveHeights]
    return heightConfig[position as keyof typeof heightConfig] || baseHeights[position as keyof typeof baseHeights]
  }

  const getPodiumStyles = (position: number, othersCount: number, isTvMode: boolean) => {
    const adaptiveHeight = getAdaptivePodiumHeight(othersCount, position, isTvMode)
    switch (position) {
      case 1: return { cardClass: "bg-gradient-to-br from-yellow-500/20 to-yellow-700/20 border-yellow-500/40 border-2 shadow-lg shadow-yellow-500/20", iconColor: "text-yellow-400", icon: Crown, badgeClass: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", height: adaptiveHeight }
      case 2: return { cardClass: "bg-gradient-to-br from-gray-400/20 to-gray-600/20 border-gray-400/40 border-2", iconColor: "text-gray-300", icon: Medal, badgeClass: "bg-gray-500/20 text-gray-300 border-gray-500/30", height: adaptiveHeight }
      case 3: return { cardClass: "bg-gradient-to-br from-amber-600/20 to-amber-800/20 border-amber-600/40 border-2", iconColor: "text-amber-500", icon: Award, badgeClass: "bg-amber-600/20 text-amber-500 border-amber-600/30", height: adaptiveHeight }
      default: return { cardClass: "bg-gray-800/50 border-gray-700", iconColor: "text-gray-400", icon: Trophy, badgeClass: "bg-gray-500/20 text-gray-400 border-gray-500/30", height: "h-64" }
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 text-center">
        <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>Carregando Performance...</h2>
        <div className="animate-pulse"><div className="h-96 bg-gray-800 rounded-lg"></div></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-red-900/20 border border-red-500/30 rounded-lg p-8 text-center">
        <AlertCircle className="h-16 w-16 text-red-400 mb-4" />
        <h2 className={`font-bold text-red-400 ${isTvMode ? "text-3xl" : "text-xl"}`}>Erro ao Carregar Dados</h2>
        <p className={`text-red-300 mt-2 ${isTvMode ? "text-lg" : "text-base"}`}>{error}</p>
      </div>
    )
  }

  const topThree = vendedores.slice(0, 3)
  const others = vendedores.slice(3, 11)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>Performance por Período</h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          📈 Acompanhe o desempenho diário, semanal e mensal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Trophy className={`text-yellow-400 ${isTvMode ? "h-6 w-6" : "h-5 w-5"}`} />
            <h3 className={`text-white font-semibold ${isTvMode ? "text-2xl" : "text-xl"}`}>PÓDIUM DO MÊS</h3>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-10 items-end w-full max-w-3xl min-w-[540px]">
              {topThree[1] && (
                <Card className={`${getPodiumStyles(2, others.length, isTvMode).cardClass} ${getPodiumStyles(2, others.length, isTvMode).height} flex flex-col min-w-[170px] max-w-[240px]`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Medal className={`${getPodiumStyles(2, others.length, isTvMode).iconColor} ${isTvMode ? "h-5 w-5" : "h-4 w-4"}`} />
                      <span className={`font-bold ${getPodiumStyles(2, others.length, isTvMode).iconColor} ${isTvMode ? "text-lg" : "text-base"}`}>2º</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-between p-3">
                    <div className="text-center space-y-2">
                      <img src={topThree[1].photo || "/placeholder.svg?height=50&width=50"} alt={topThree[1].name} className={`mx-auto rounded-full border-2 border-gray-300 ${isTvMode ? "w-14 h-14" : "w-12 h-12"}`} />
                      <div>
                        <h4 className={`font-semibold text-white ${isTvMode ? "text-sm" : "text-xs"}`}>{topThree[1].name}</h4>
                        <Badge className={`${getStatusColor(topThree[1].status)} text-xs mt-1`}>{topThree[1].percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full space-y-1 mt-3">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><Calendar className="h-2 w-2 text-gray-400" /><span className="text-xs text-gray-400">Hoje</span></div><span className="text-xs font-semibold text-white">{formatCurrency(topThree[1].salesToday)}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><CalendarDays className="h-2 w-2 text-gray-400" /><span className="text-xs text-gray-400">Semana</span></div><span className="text-xs font-semibold text-white">{formatCurrency(topThree[1].salesWeek)}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><CalendarRange className="h-2 w-2 text-gray-400" /><span className="text-xs text-gray-400">Mês</span></div><span className="text-xs font-bold text-white">{formatCurrency(topThree[1].salesMonth)}</span></div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {topThree[0] && (
                <Card className={`${getPodiumStyles(1, others.length, isTvMode).cardClass} ${getPodiumStyles(1, others.length, isTvMode).height} flex flex-col min-w-[190px] max-w-[260px]`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Crown className={`${getPodiumStyles(1, others.length, isTvMode).iconColor} ${isTvMode ? "h-6 w-6" : "h-5 w-5"}`} />
                      <span className={`font-bold ${getPodiumStyles(1, others.length, isTvMode).iconColor} ${isTvMode ? "text-xl" : "text-lg"}`}>1º</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-between p-3">
                    <div className="text-center space-y-2">
                      <img src={topThree[0].photo || "/placeholder.svg?height=60&width=60"} alt={topThree[0].name} className={`mx-auto rounded-full border-3 border-yellow-400 ${isTvMode ? "w-16 h-16" : "w-14 h-14"}`} />
                      <div>
                        <h4 className={`font-bold text-white ${isTvMode ? "text-base" : "text-sm"}`}>👑 {topThree[0].name}</h4>
                        <Badge className={`${getStatusColor(topThree[0].status)} text-xs mt-1`}>🏆 {topThree[0].percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full space-y-2 mt-3">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><Calendar className="h-3 w-3 text-yellow-400" /><span className="text-xs text-yellow-400">Hoje</span></div><span className="text-xs font-semibold text-white">{formatCurrency(topThree[0].salesToday)}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><CalendarDays className="h-3 w-3 text-yellow-400" /><span className="text-xs text-yellow-400">Semana</span></div><span className="text-xs font-semibold text-white">{formatCurrency(topThree[0].salesWeek)}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><CalendarRange className="h-3 w-3 text-yellow-400" /><span className="text-xs text-yellow-400">Mês</span></div><span className="text-xs font-bold text-white">{formatCurrency(topThree[0].salesMonth)}</span></div>
                    </div>
                  </CardContent>
                </Card>
              )}
              {topThree[2] && (
                <Card className={`${getPodiumStyles(3, others.length, isTvMode).cardClass} ${getPodiumStyles(3, others.length, isTvMode).height} flex flex-col min-w-[170px] max-w-[240px]`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-center space-x-1">
                      <Award className={`${getPodiumStyles(3, others.length, isTvMode).iconColor} ${isTvMode ? "h-5 w-5" : "h-4 w-4"}`} />
                      <span className={`font-bold ${getPodiumStyles(3, others.length, isTvMode).iconColor} ${isTvMode ? "text-lg" : "text-base"}`}>3º</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col items-center justify-between p-3">
                    <div className="text-center space-y-2">
                      <img src={topThree[2].photo || "/placeholder.svg?height=50&width=50"} alt={topThree[2].name} className={`mx-auto rounded-full border-2 border-amber-500 ${isTvMode ? "w-14 h-14" : "w-12 h-12"}`} />
                      <div>
                        <h4 className={`font-semibold text-white ${isTvMode ? "text-sm" : "text-xs"}`}>{topThree[2].name}</h4>
                        <Badge className={`${getStatusColor(topThree[2].status)} text-xs mt-1`}>{topThree[2].percentage}%</Badge>
                      </div>
                    </div>
                    <div className="w-full space-y-1 mt-3">
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><Calendar className="h-2 w-2 text-gray-400" /><span className="text-xs text-gray-400">Hoje</span></div><span className="text-xs font-semibold text-white">{formatCurrency(topThree[2].salesToday)}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><CalendarDays className="h-2 w-2 text-gray-400" /><span className="text-xs text-gray-400">Semana</span></div><span className="text-xs font-semibold text-white">{formatCurrency(topThree[2].salesWeek)}</span></div>
                      <div className="flex items-center justify-between"><div className="flex items-center space-x-1"><CalendarRange className="h-2 w-2 text-gray-400" /><span className="text-xs text-gray-400">Mês</span></div><span className="text-xs font-bold text-white">{formatCurrency(topThree[2].salesMonth)}</span></div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <CalendarRange className={`text-blue-400 ${isTvMode ? "h-6 w-6" : "h-5 w-5"}`} />
            <h3 className={`text-white font-semibold ${isTvMode ? "text-2xl" : "text-xl"}`}>
              Performance por Período - Demais Competidores
            </h3>
          </div>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-4">
              {others.length === 0 ? (
                <div className="text-center py-8"><p className="text-gray-400 text-lg">Nenhum competidor adicional para exibir.</p></div>
              ) : (
                <div className="space-y-3">
                  {others.map((member, index) => {
                    const position = index + 4
                    return (
                      <div key={member.id} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 border border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-gray-300 ${isTvMode ? "w-10 h-10 text-base" : "text-sm"}`}>{position}</div>
                          <img src={member.photo || "/placeholder.svg?height=40&width=40"} alt={member.name} className={`rounded-full border-2 border-gray-600 ${isTvMode ? "w-10 h-10" : "w-8 h-8"}`} />
                          <div>
                            <h4 className={`font-semibold text-white ${isTvMode ? "text-base" : "text-sm"}`}>{member.name}</h4>
                            <Badge className={`${getStatusColor(member.status)} text-xs`}>{member.percentage}% da meta</Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-right">
                          <div>
                            <div className="flex items-center space-x-1 text-gray-400 mb-1"><Calendar className="h-3 w-3" /><span className={`${isTvMode ? "text-xs" : "text-xs"}`}>Hoje</span></div>
                            <div className={`font-semibold text-white ${isTvMode ? "text-sm" : "text-xs"}`}>{formatCurrency(member.salesToday)}</div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 text-gray-400 mb-1"><CalendarDays className="h-3 w-3" /><span className={`${isTvMode ? "text-xs" : "text-xs"}`}>Semana</span></div>
                            <div className={`font-semibold text-white ${isTvMode ? "text-sm" : "text-xs"}`}>{formatCurrency(member.salesWeek)}</div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-1 text-gray-400 mb-1"><CalendarRange className="h-3 w-3" /><span className={`${isTvMode ? "text-xs" : "text-xs"}`}>Mês</span></div>
                            <div className={`font-semibold text-white ${isTvMode ? "text-sm" : "text-xs"}`}>{formatCurrency(member.salesMonth)}</div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-600/40 border-2">
          <CardContent className={`p-6 text-center ${isTvMode ? "p-8" : ""}`}>
            <TrendingUp className={`mx-auto mb-4 text-green-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
            <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>{vendedores.filter((m) => m.status === "Superou").length}</div>
            <div className={`text-green-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Vendedores acima da meta</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-600/40 border-2">
          <CardContent className={`p-6 text-center ${isTvMode ? "p-8" : ""}`}>
            <Trophy className={`mx-auto mb-4 text-blue-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
            <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>{formatCurrency(vendedores.reduce((sum, m) => sum + m.salesMonth, 0))}</div>
            <div className={`text-blue-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Total de vendas da equipe</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-600/40 border-2">
          <CardContent className={`p-6 text-center ${isTvMode ? "p-8" : ""}`}>
            <Target className={`mx-auto mb-4 text-purple-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
            <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>{Math.round(vendedores.reduce((sum, m) => sum + m.percentage, 0) / (vendedores.length || 1))}%</div>
            <div className={`text-purple-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Média de atingimento</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}