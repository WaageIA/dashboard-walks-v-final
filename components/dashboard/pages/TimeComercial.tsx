"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, TrendingDown, Award, DollarSign } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface TimeComercialProps {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function TimeComercial({ data, loading, isTvMode }: TimeComercialProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // Dados específicos do time comercial
  const salesMetrics = [
    {
      title: "Vendas Totais",
      value: formatCurrency(450000),
      target: formatCurrency(500000),
      percentage: 90,
      trend: 12,
      icon: DollarSign,
    },
    {
      title: "Leads Qualificados",
      value: "750",
      target: "800",
      percentage: 94,
      trend: 8,
      icon: Target,
    },
    {
      title: "Taxa de Conversão",
      value: "14.4%",
      target: "15%",
      percentage: 96,
      trend: -2,
      icon: TrendingUp,
    },
    {
      title: "Ticket Médio",
      value: formatCurrency(4167),
      target: formatCurrency(4000),
      percentage: 104,
      trend: 5,
      icon: Award,
    },
  ]

  const salesByProduct = [
    { produto: "Produto A", vendas: 180000, meta: 200000 },
    { produto: "Produto B", vendas: 150000, meta: 160000 },
    { produto: "Produto C", vendas: 120000, meta: 140000 },
  ]

  const salesActivities = [
    { atividade: "Ligações", realizadas: 1250, meta: 1200 },
    { atividade: "E-mails", realizadas: 890, meta: 800 },
    { atividade: "Reuniões", realizadas: 145, meta: 150 },
    { atividade: "Propostas", realizadas: 89, meta: 100 },
  ]

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
        <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-gray-900/50 border-gray-800 animate-pulse">
              <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
                <div className="h-24 bg-gray-800 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Métricas do Time Comercial */}
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        {salesMetrics.map((metric, index) => {
          const Icon = metric.icon

          return (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
            >
              <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-green-600/20">
                    <Icon className={`text-green-400 ${isTvMode ? "h-8 w-8" : "h-6 w-6"}`} />
                  </div>
                  <div
                    className={`flex items-center space-x-1 ${metric.trend >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {metric.trend >= 0 ? (
                      <TrendingUp className={isTvMode ? "h-5 w-5" : "h-4 w-4"} />
                    ) : (
                      <TrendingDown className={isTvMode ? "h-5 w-5" : "h-4 w-4"} />
                    )}
                    <span className={`font-semibold ${isTvMode ? "text-base" : "text-sm"}`}>
                      {metric.trend > 0 ? "+" : ""}
                      {metric.trend}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>{metric.title}</h3>
                  <p className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>{metric.value}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Meta: {metric.target}</span>
                      <span
                        className={`font-semibold ${
                          metric.percentage >= 100
                            ? "text-green-500"
                            : metric.percentage >= 80
                              ? "text-yellow-500"
                              : "text-red-500"
                        }`}
                      >
                        {metric.percentage}%
                      </span>
                    </div>
                    <Progress value={metric.percentage} className="h-2 bg-gray-800" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gráficos de Performance */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Vendas por Produto */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>Vendas por Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <BarChart data={salesByProduct}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="produto" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
                <YAxis stroke="#9CA3AF" tickFormatter={formatCurrency} fontSize={isTvMode ? 14 : 12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value: number, name: string) => [
                    formatCurrency(value),
                    name === "vendas" ? "Vendas" : "Meta",
                  ]}
                />
                <Bar dataKey="vendas" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="meta" fill="#374151" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Atividades Comerciais */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>Atividades Comerciais</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <BarChart data={salesActivities} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
                <YAxis
                  type="category"
                  dataKey="atividade"
                  stroke="#9CA3AF"
                  fontSize={isTvMode ? 14 : 12}
                  width={isTvMode ? 100 : 80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="realizadas" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="meta" fill="#6b7280" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Ranking e Funil Detalhado */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Ranking Detalhado */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
              Ranking Detalhado - Time Comercial
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.salesTeam.map((member, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold ${isTvMode ? "w-12 h-12" : ""}`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>
                        {member.name}
                      </h4>
                      <p className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
                        {formatCurrency(member.sales)}
                      </p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(member.status)} ${isTvMode ? "text-sm" : "text-xs"}`}>
                    {member.status}
                  </Badge>
                </div>

                <div className="space-y-2">
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
                  <Progress value={member.percentage} className="h-2 bg-gray-700" />
                </div>

                <div className={`grid grid-cols-3 gap-4 mt-3 ${isTvMode ? "text-base" : "text-sm"}`}>
                  <div className="text-center">
                    <div className="text-gray-400">Ligações</div>
                    <div className="font-bold text-white">{Math.floor(Math.random() * 200) + 100}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">Reuniões</div>
                    <div className="font-bold text-white">{Math.floor(Math.random() * 30) + 10}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">Propostas</div>
                    <div className="font-bold text-white">{Math.floor(Math.random() * 15) + 5}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Funil de Vendas Detalhado */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
              Funil de Vendas Detalhado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.salesFunnel.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm ${isTvMode ? "w-10 h-10" : ""}`}
                    >
                      {index + 1}
                    </div>
                    <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>{step.stage}</h4>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
                      {formatNumber(step.count)}
                    </div>
                    {step.conversionRate && (
                      <div className={`text-green-400 ${isTvMode ? "text-sm" : "text-xs"}`}>
                        {step.conversionRate}% conversão
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-1000"
                    style={{ width: `${(step.count / data.salesFunnel[0].count) * 100}%` }}
                  ></div>
                </div>

                <div className={`mt-2 text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>
                  {((step.count / data.salesFunnel[0].count) * 100).toFixed(1)}% do total inicial
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
