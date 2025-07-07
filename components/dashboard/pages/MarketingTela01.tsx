"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, TrendingDown, Target, Eye, MousePointer, Search, Globe } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface MarketingTela01Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function MarketingTela01({ data, loading, isTvMode }: MarketingTela01Props) {
  const formatNumber = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`
    }
    return value.toString()
  }

  // Dados específicos do marketing
  const marketingMetrics = [
    {
      title: "Leads Gerados",
      value: "1.250",
      target: "1.000",
      percentage: 125,
      trend: 8,
      icon: Users,
    },
    {
      title: "Custo por Lead",
      value: "R$ 45",
      target: "R$ 50",
      percentage: 90,
      trend: -10,
      icon: Target,
    },
    {
      title: "Taxa de Conversão",
      value: "3.4%",
      target: "3.0%",
      percentage: 113,
      trend: 13,
      icon: MousePointer,
    },
    {
      title: "Alcance Total",
      value: "850K",
      target: "800K",
      percentage: 106,
      trend: 15,
      icon: Eye,
    },
  ]

  // Dados de fontes de tráfego
  const trafficSources = [
    { source: "Orgânico", percentage: 45.2, color: "#10b981" },
    { source: "Pago", percentage: 32.8, color: "#3b82f6" },
    { source: "Social", percentage: 22.0, color: "#8b5cf6" },
  ]

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

  const getTrendIcon = (trend: number) => {
    const iconClass = isTvMode ? "h-5 w-5" : "h-4 w-4"
    return trend >= 0 ? (
      <TrendingUp className={`${iconClass} text-green-500`} />
    ) : (
      <TrendingDown className={`${iconClass} text-red-500`} />
    )
  }

  const getTrendColor = (trend: number) => {
    return trend >= 0 ? "text-green-500" : "text-red-500"
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            Carregando Métricas de Marketing...
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
          Principais Métricas de Marketing
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Performance de leads, conversões e fontes de tráfego
        </p>
      </div>

      {/* Métricas Principais */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        {marketingMetrics.map((metric, index) => {
          const Icon = metric.icon

          return (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
            >
              <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-600/20">
                    <Icon className={`text-blue-400 ${isTvMode ? "h-8 w-8" : "h-6 w-6"}`} />
                  </div>
                  <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
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

      {/* Seção Inferior - Gráfico de Pizza e Fontes de Tráfego */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Gráfico de Pizza - Leads por Canal */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-xl"}`}>
              Distribuição de Leads por Canal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <PieChart>
                <Pie
                  data={data.marketingData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isTvMode ? 120 : 80}
                  fill="#8884d8"
                  dataKey="leads"
                >
                  {data.marketingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value: number) => [formatNumber(value), "Leads"]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Legenda Personalizada */}
            <div className={`mt-6 grid grid-cols-1 gap-3 ${isTvMode ? "gap-4" : ""}`}>
              {data.marketingData.map((entry, index) => (
                <div key={entry.channel} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full ${isTvMode ? "w-5 h-5" : ""}`}
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className={`text-white font-medium ${isTvMode ? "text-lg" : "text-base"}`}>
                      {entry.channel}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-white font-bold ${isTvMode ? "text-lg" : "text-base"}`}>
                      {formatNumber(entry.leads)} leads
                    </div>
                    <div className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
                      {((entry.leads / data.marketingData.reduce((sum, item) => sum + item.leads, 0)) * 100).toFixed(1)}
                      %
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fontes de Tráfego */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-xl"}`}>Fontes de Tráfego</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {trafficSources.map((source, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {source.source === "Orgânico" && (
                      <Search className={`h-6 w-6 text-green-400 ${isTvMode ? "h-8 w-8" : ""}`} />
                    )}
                    {source.source === "Pago" && (
                      <Target className={`h-6 w-6 text-blue-400 ${isTvMode ? "h-8 w-8" : ""}`} />
                    )}
                    {source.source === "Social" && (
                      <Globe className={`h-6 w-6 text-purple-400 ${isTvMode ? "h-8 w-8" : ""}`} />
                    )}
                    <span className={`text-white font-medium ${isTvMode ? "text-xl" : "text-lg"}`}>
                      {source.source}
                    </span>
                  </div>
                  <span className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
                    {source.percentage}%
                  </span>
                </div>
                <Progress
                  value={source.percentage}
                  className={`h-3 bg-gray-700 ${isTvMode ? "h-4" : ""}`}
                  style={
                    {
                      "--progress-foreground": source.color,
                    } as React.CSSProperties
                  }
                />
              </div>
            ))}

            {/* Resumo Total */}
            <div className="mt-6 p-4 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <div className="text-center">
                <div className={`text-blue-400 font-bold ${isTvMode ? "text-2xl" : "text-xl"} mb-2`}>
                  Total de Visitantes
                </div>
                <div className={`text-white ${isTvMode ? "text-lg" : "text-base"} mb-1`}>125.8K este mês</div>
                <div className={`text-green-400 ${isTvMode ? "text-base" : "text-sm"}`}>+18% vs mês anterior</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
