"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, BarChart3, Activity } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface ComercialTela02Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function ComercialTela02({ data, loading, isTvMode }: ComercialTela02Props) {
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

  // Dados simulados para vendas por produto
  const salesByProduct = [
    { produto: "Produto A", vendas: 180000, meta: 200000 },
    { produto: "Produto B", vendas: 150000, meta: 160000 },
    { produto: "Produto C", vendas: 120000, meta: 140000 },
    { produto: "Produto D", vendas: 95000, meta: 100000 },
    { produto: "Produto E", vendas: 85000, meta: 90000 },
  ]

  // Dados simulados para atividades comerciais
  const salesActivities = [
    { atividade: "Ligações", realizadas: 1250, meta: 1200 },
    { atividade: "E-mails", realizadas: 890, meta: 800 },
    { atividade: "Reuniões", realizadas: 145, meta: 150 },
    { atividade: "Propostas", realizadas: 89, meta: 100 },
    { atividade: "Follow-ups", realizadas: 320, meta: 300 },
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            Carregando Análises Comerciais...
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
          Análises Comerciais Detalhadas
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Funil de vendas, produtos e atividades da equipe comercial
        </p>
      </div>

      {/* Layout Principal - 3 Seções */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Funil de Vendas Detalhado */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-2xl" : "text-xl"}`}>
              <TrendingDown className={isTvMode ? "h-8 w-8" : "h-6 w-6"} />
              Funil de Vendas
            </CardTitle>
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
                      <h4 className={`font-semibold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>{step.stage}</h4>
                      <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
                        {formatNumber(step.count)} oportunidades
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
                      {formatNumber(step.count)}
                    </div>
                    {step.conversionRate && (
                      <div className={`text-green-400 ${isTvMode ? "text-base" : "text-sm"}`}>
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
                  <span>{((step.count / data.salesFunnel[0].count) * 100).toFixed(1)}% do total</span>
                  {index < data.salesFunnel.length - 1 && (
                    <span>Perda: {formatNumber(step.count - (data.salesFunnel[index + 1]?.count || 0))}</span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Vendas por Produto */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-2xl" : "text-xl"}`}>
              <BarChart3 className={isTvMode ? "h-8 w-8" : "h-6 w-6"} />
              Vendas por Produto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 500 : 400}>
              <BarChart data={salesByProduct}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="produto"
                  stroke="#9CA3AF"
                  fontSize={isTvMode ? 14 : 12}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
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
            <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-2xl" : "text-xl"}`}>
              <Activity className={isTvMode ? "h-8 w-8" : "h-6 w-6"} />
              Atividades Comerciais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isTvMode ? 500 : 400}>
              <BarChart data={salesActivities} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
                <YAxis
                  type="category"
                  dataKey="atividade"
                  stroke="#9CA3AF"
                  fontSize={isTvMode ? 14 : 12}
                  width={isTvMode ? 120 : 100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "white",
                  }}
                  formatter={(value: number, name: string) => [value, name === "realizadas" ? "Realizadas" : "Meta"]}
                />
                <Bar dataKey="realizadas" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="meta" fill="#6b7280" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
