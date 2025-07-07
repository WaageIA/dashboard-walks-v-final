"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Award, DollarSign, Users } from "lucide-react"
import type { DashboardData } from "@/types/dashboard"

interface ComercialTela1Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function ComercialTela1({ data, loading, isTvMode }: ComercialTela1Props) {
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
      case "Superou":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Próximo":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Abaixo":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            Time Comercial - Performance Individual
          </h2>
        </div>
        <div className="animate-pulse">
          <div className="h-96 bg-gray-800 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Título da Tela */}
      <div className="text-center">
        <h2 className={`font-bold text-white ${isTvMode ? "text-4xl mb-4" : "text-2xl mb-2"}`}>
          Time Comercial - Performance Individual
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Ranking e métricas detalhadas da equipe de vendas
        </p>
      </div>

      {/* Métricas Principais do Time */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <DollarSign className={`text-green-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
                  {formatCurrency(450000)}
                </div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Vendas Totais</div>
              </div>
            </div>
            <Progress value={90} className="h-3 bg-gray-800" />
            <div className="flex justify-between mt-2">
              <span className={`text-gray-500 ${isTvMode ? "text-base" : "text-sm"}`}>
                Meta: {formatCurrency(500000)}
              </span>
              <span className="text-green-400 font-semibold">90%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Target className={`text-blue-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>108</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Vendas Fechadas</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+12%</span>
              <span className="text-gray-400 text-sm">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Award className={`text-yellow-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
                  {formatCurrency(4167)}
                </div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Ticket Médio</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+5%</span>
              <span className="text-gray-400 text-sm">vs meta</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Users className={`text-purple-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>4</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Vendedores Ativos</div>
              </div>
            </div>
            <div className="text-center">
              <span className="text-green-400 font-semibold">2 acima da meta</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ranking Detalhado da Equipe */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>
            Ranking da Equipe Comercial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.salesTeam.map((member, index) => (
            <div key={index} className="p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-green-500 flex items-center justify-center text-white font-bold ${isTvMode ? "w-16 h-16 text-xl" : "text-lg"}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>{member.name}</h4>
                    <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-base"}`}>
                      {formatCurrency(member.sales)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(member.status)} ${isTvMode ? "text-base px-4 py-2" : "text-sm"}`}>
                    {member.status}
                  </Badge>
                  <div className={`mt-2 text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
                    {member.percentage}% da meta
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Meta: R$ 40.000</span>
                  <span
                    className={`font-semibold ${
                      member.percentage >= 100
                        ? "text-green-500"
                        : member.percentage >= 80
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {member.percentage}%
                  </span>
                </div>
                <Progress value={member.percentage} className="h-3 bg-gray-700" />
              </div>

              <div className={`grid grid-cols-4 gap-4 mt-4 ${isTvMode ? "text-lg" : "text-sm"}`}>
                <div className="text-center p-3 rounded bg-gray-700/50">
                  <div className="text-gray-400">Ligações</div>
                  <div className="font-bold text-white">{Math.floor(Math.random() * 200) + 100}</div>
                </div>
                <div className="text-center p-3 rounded bg-gray-700/50">
                  <div className="text-gray-400">E-mails</div>
                  <div className="font-bold text-white">{Math.floor(Math.random() * 150) + 50}</div>
                </div>
                <div className="text-center p-3 rounded bg-gray-700/50">
                  <div className="text-gray-400">Reuniões</div>
                  <div className="font-bold text-white">{Math.floor(Math.random() * 30) + 10}</div>
                </div>
                <div className="text-center p-3 rounded bg-gray-700/50">
                  <div className="text-gray-400">Propostas</div>
                  <div className="font-bold text-white">{Math.floor(Math.random() * 15) + 5}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
