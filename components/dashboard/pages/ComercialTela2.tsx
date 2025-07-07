"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, BarChart3, Calendar, Clock } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface ComercialTela2Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function ComercialTela2({ data, loading, isTvMode }: ComercialTela2Props) {
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

  // Dados simulados para atividades e pipeline
  const atividadesSemana = [
    { dia: "Seg", ligacoes: 45, reunioes: 8, propostas: 3 },
    { dia: "Ter", ligacoes: 52, reunioes: 12, propostas: 5 },
    { dia: "Qua", ligacoes: 38, reunioes: 6, propostas: 2 },
    { dia: "Qui", ligacoes: 61, reunioes: 15, propostas: 7 },
    { dia: "Sex", ligacoes: 48, reunioes: 10, propostas: 4 },
  ]

  const pipelineMensal = [
    { mes: "Set", pipeline: 180000, fechado: 120000 },
    { mes: "Out", pipeline: 220000, fechado: 150000 },
    { mes: "Nov", pipeline: 280000, fechado: 180000 },
    { mes: "Dez", pipeline: 320000, fechado: 200000 },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            Time Comercial - Atividades e Pipeline
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
          Time Comercial - Atividades e Pipeline
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Análise de atividades comerciais e evolução do pipeline
        </p>
      </div>

      {/* Funil de Vendas Expandido */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>Funil de Vendas Detalhado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.salesFunnel.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold ${isTvMode ? "w-16 h-16 text-xl" : "text-lg"}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h4 className={`font-semibold text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>{step.stage}</h4>
                    <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
                      {formatNumber(step.count)} oportunidades
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-white ${isTvMode ? "text-2xl" : "text-xl"}`}>
                    {formatNumber(step.count)}
                  </div>
                  {step.conversionRate && (
                    <div className={`text-green-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
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

              <div className={`mt-2 flex justify-between text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
                <span>{((step.count / data.salesFunnel[0].count) * 100).toFixed(1)}% do total inicial</span>
                {index < data.salesFunnel.length - 1 && (
                  <span>
                    Perda: {formatNumber(step.count - (data.salesFunnel[index + 1]?.count || 0))} oportunidades
                  </span>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Gráficos de Atividades e Pipeline */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Atividades da Semana */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>Atividades da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <BarChart data={atividadesSemana}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="dia" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
                <YAxis stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                />
                <Bar dataKey="ligacoes" fill="#3b82f6" name="Ligações" />
                <Bar dataKey="reunioes" fill="#10b981" name="Reuniões" />
                <Bar dataKey="propostas" fill="#f59e0b" name="Propostas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pipeline vs Fechamento */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>Pipeline vs Fechamento</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
              <LineChart data={pipelineMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="mes" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
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
                    name === "pipeline" ? "Pipeline" : "Fechado",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="pipeline"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  name="Pipeline"
                />
                <Line
                  type="monotone"
                  dataKey="fechado"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                  name="Fechado"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Métricas de Produtividade */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Calendar className={`text-blue-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>89%</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Taxa de Follow-up</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+5%</span>
              <span className="text-gray-400 text-sm">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Clock className={`text-green-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>18</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Dias Ciclo Médio</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">-3 dias</span>
              <span className="text-gray-400 text-sm">vs meta</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className={`text-purple-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>34%</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Win Rate</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+2%</span>
              <span className="text-gray-400 text-sm">vs trimestre</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
