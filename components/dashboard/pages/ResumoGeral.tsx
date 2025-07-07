"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Users, TrendingUp, TrendingDown, Activity, Globe, Zap } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface ResumoGeralProps {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function ResumoGeral({ data, loading, isTvMode }: ResumoGeralProps) {
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
      {/* Métricas Principais */}
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        {data.metrics.map((metric, index) => {
          const icons = {
            sales: DollarSign,
            leads: Users,
            followers: Globe,
            conversion: Zap,
          }
          const Icon = icons[metric.type] || Activity

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

                  {metric.target && metric.percentage && (
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
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Gráficos Principais */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Vendas vs Meta */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
              Vendas vs Meta - Últimos 30 dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <LineChart data={data.salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
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
                    name === "sales" ? "Vendas" : "Meta",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#ef4444"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance por Canal */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
              Performance por Canal de Marketing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <BarChart data={data.marketingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="channel"
                  stroke="#9CA3AF"
                  fontSize={isTvMode ? 14 : 12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis stroke="#9CA3AF" tickFormatter={formatNumber} fontSize={isTvMode ? 14 : 12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value: number) => [formatNumber(value), "Leads"]}
                />
                <Bar dataKey="leads" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resumo das Equipes */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Funil de Vendas */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Funil de Vendas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.salesFunnel.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>{step.stage}</h4>
                  <div className="text-right">
                    <div className={`font-bold text-white ${isTvMode ? "text-lg" : "text-base"}`}>
                      {formatNumber(step.count)}
                    </div>
                    {step.conversionRate && (
                      <div className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>
                        {step.conversionRate}% conversão
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-green-500 transition-all duration-1000"
                    style={{ width: `${(step.count / data.salesFunnel[0].count) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Vendedores */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Top Vendedores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.salesTeam.slice(0, 3).map((member, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold ${isTvMode ? "w-10 h-10" : ""}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <p className={`font-medium text-white ${isTvMode ? "text-lg" : "text-base"}`}>{member.name}</p>
                    <p className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
                      {formatCurrency(member.sales)}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`
                  ${
                    member.status === "Superou"
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : member.status === "Próximo"
                        ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                  ${isTvMode ? "text-sm" : "text-xs"}
                `}
                >
                  {member.percentage}%
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Campanhas em Destaque */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Campanhas em Destaque</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.campaigns.map((campaign, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium text-white ${isTvMode ? "text-lg" : "text-base"}`}>{campaign.name}</h4>
                  <Badge
                    className={`bg-green-500/20 text-green-400 border-green-500/30 ${isTvMode ? "text-sm" : "text-xs"}`}
                  >
                    ROI: {campaign.roi}%
                  </Badge>
                </div>
                <div className={`grid grid-cols-2 gap-4 ${isTvMode ? "text-base" : "text-sm"}`}>
                  <div>
                    <div className="text-gray-400">Investido</div>
                    <div className="font-bold text-white">{formatCurrency(campaign.spent)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Conversões</div>
                    <div className="font-bold text-white">{campaign.conversions}</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Seção de Controle de TVs */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
              🖥️ Controle de Telas - TV Esquerda
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
              Comercial e Marketing com rotação automática a cada 15 segundos
            </p>
            <button
              onClick={() => {
                const url =
                  "/?tv=true&view=left&rotateDepts=comercial_tela01,comercial_tela02,marketing_tela01,marketing_tela02&dataRefresh=30000&viewRefresh=15000"
                window.open(url, "_blank")
                console.log("🚀 Lançando Tela Esquerda:", url)
              }}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${isTvMode ? "py-4 text-lg" : ""}`}
            >
              🚀 Lançar Tela Esquerda
            </button>
            <div className={`text-gray-500 ${isTvMode ? "text-base" : "text-xs"}`}>
              <div>• Comercial Tela 01 (Performance Consolidada)</div>
              <div>• Comercial Tela 02 (Análises Detalhadas)</div>
              <div>• Marketing Tela 01 (Métricas Principais)</div>
              <div>• Marketing Tela 02 (Campanhas e Engajamento)</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
              🖥️ Controle de Telas - TV Direita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
              Ranking e Metas com rotação automática a cada 20 segundos
            </p>
            <button
              onClick={() => {
                const url =
                  "/?tv=true&view=right&rotateDepts=ranking_vendas,metas_produtos&dataRefresh=30000&viewRefresh=20000"
                window.open(url, "_blank")
                console.log("🚀 Lançando Tela Direita:", url)
              }}
              className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ${isTvMode ? "py-4 text-lg" : ""}`}
            >
              🚀 Lançar Tela Direita
            </button>
            <div className={`text-gray-500 ${isTvMode ? "text-base" : "text-xs"}`}>
              <div>• Ranking de Vendas (Pódio Gamificado)</div>
              <div>• Resumo de Metas de Produtos</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
