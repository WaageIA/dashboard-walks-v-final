"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Layers,
  ShoppingBag,
  CreditCard,
  Smartphone,
  Monitor,
  ShoppingCart,
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface ResumoMetasProdutosProps {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function ResumoMetasProdutos({ data, loading, isTvMode }: ResumoMetasProdutosProps) {
  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Função para obter o ícone do produto
  const getProductIcon = (productId: string) => {
    const iconClass = isTvMode ? "h-8 w-8" : "h-6 w-6"

    switch (productId) {
      case "whitelabels":
        return <Layers className={iconClass} />
      case "marketplace":
        return <ShoppingBag className={iconClass} />
      case "banco_digital":
        return <CreditCard className={iconClass} />
      case "tap_to_pay":
        return <Smartphone className={iconClass} />
      case "totem":
        return <Monitor className={iconClass} />
      case "pdv":
        return <ShoppingCart className={iconClass} />
      default:
        return <Target className={iconClass} />
    }
  }

  // Função para calcular o percentual
  const calculatePercentage = (current: number, target: number) => {
    const percentage = Math.round((current / target) * 100)
    return Math.min(percentage, 100) // Limitar a 100% para visualização
  }

  // Função para obter a cor do percentual
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 100) return "text-green-400"
    if (percentage >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  // Calcular totais para o gráfico de faturamento
  const calculateTotals = () => {
    if (!data?.productGoals) return { totalCurrent: 0, totalTarget: 0, percentage: 0 }

    const totalCurrent = data.productGoals.reduce((sum, product) => sum + product.revenueCurrent, 0)
    const totalTarget = data.productGoals.reduce((sum, product) => sum + product.revenueTarget, 0)
    const percentage = Math.round((totalCurrent / totalTarget) * 100)

    return { totalCurrent, totalTarget, percentage }
  }

  // Preparar dados para o gráfico de faturamento por produto
  const revenueChartData =
    data?.productGoals?.map((product) => ({
      name: product.name,
      atual: product.revenueCurrent,
      meta: product.revenueTarget,
      color: product.color,
    })) || []

  // Estado de carregamento
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <h2 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-xl"} mb-4`}>
            Carregando Resumo de Metas...
          </h2>
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto"></div>
        </div>
      </div>
    )
  }

  // Verificar se há dados de produtos
  if (!data?.productGoals || data.productGoals.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-950">
        <div className="text-center">
          <h2 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>Dados não disponíveis</h2>
          <p className={`text-gray-400 mt-4 ${isTvMode ? "text-lg" : "text-base"}`}>Verifique a conexão com a API</p>
        </div>
      </div>
    )
  }

  const totals = calculateTotals()

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-950">
      {/* Header Compacto */}
      <div className="text-center py-4">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <TrendingUp className={`text-blue-400 ${isTvMode ? "h-8 w-8" : "h-6 w-6"}`} />
          <h2 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>Resumo de Metas de Produtos</h2>
          <TrendingUp className={`text-blue-400 ${isTvMode ? "h-8 w-8" : "h-6 w-6"}`} />
        </div>
      </div>

      {/* Layout Principal - Tudo em uma tela */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 min-h-0">
        {/* Coluna Esquerda - Gráficos Compactos */}
        <div className="col-span-7 space-y-4">
          {/* Gráfico de Produtividade - Compacto */}
          <Card className="bg-gray-900/50 border-gray-800 h-[45%]">
            <CardHeader className="pb-2">
              <CardTitle className={`text-white flex items-center gap-2 ${isTvMode ? "text-lg" : "text-base"}`}>
                <BarChart3 className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
                Produtividade Diária (30 dias)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={isTvMode ? 200 : 160}>
                <LineChart data={data.productivityData || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={isTvMode ? 12 : 10} interval="preserveStartEnd" />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={isTvMode ? 12 : 10}
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "white",
                    }}
                    formatter={(value: number, name: string) => [
                      `${value}%`,
                      name === "productivity" ? "Produtividade" : "Meta",
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="productivity"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, stroke: "#10b981", strokeWidth: 2 }}
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

          {/* Gráfico de Faturamento - Compacto */}
          <Card className="bg-gray-900/50 border-gray-800 h-[50%]">
            <CardHeader className="pb-2">
              <CardTitle className={`text-white flex items-center gap-2 ${isTvMode ? "text-lg" : "text-base"}`}>
                <DollarSign className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
                Faturamento vs Meta
              </CardTitle>
              <div className="flex items-center justify-between">
                <div className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>
                  Total: {formatCurrency(totals.totalCurrent)} / {formatCurrency(totals.totalTarget)}
                </div>
                <div
                  className={`font-bold ${getPercentageColor(totals.percentage)} ${isTvMode ? "text-lg" : "text-base"}`}
                >
                  {totals.percentage}%
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={isTvMode ? 220 : 180}>
                <BarChart data={revenueChartData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" tickFormatter={formatCurrency} fontSize={isTvMode ? 12 : 10} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#9CA3AF"
                    fontSize={isTvMode ? 12 : 10}
                    width={isTvMode ? 100 : 80}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#111827",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "white",
                    }}
                    formatter={(value: number, name: string) => [
                      formatCurrency(value),
                      name === "atual" ? "Faturamento Atual" : "Meta",
                    ]}
                  />
                  <Bar dataKey="atual" fill="#10b981" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="meta" fill="#374151" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - Produtos em Grid Compacto */}
        <div className="col-span-5 flex flex-col">
          <div className="text-center mb-3">
            <h3 className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Produtos</h3>
            <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>Metas individuais</p>
          </div>

          {/* Grid de Produtos - 2 colunas */}
          <div className="grid grid-cols-2 gap-3 flex-1 overflow-hidden">
            {data.productGoals.map((product) => {
              const quantityPercentage = calculatePercentage(product.quantityCurrent, product.quantityTarget)
              const revenuePercentage = calculatePercentage(product.revenueCurrent, product.revenueTarget)
              const quantityColor = getPercentageColor(quantityPercentage)
              const revenueColor = getPercentageColor(revenuePercentage)

              return (
                <Card
                  key={product.id}
                  className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-all duration-300"
                >
                  <CardContent className={`p-3 ${isTvMode ? "p-4" : ""}`}>
                    {/* Header do Produto - Compacto */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`p-1.5 rounded-lg`} style={{ backgroundColor: `${product.color}20` }}>
                        {getProductIcon(product.id)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-white truncate ${isTvMode ? "text-sm" : "text-xs"}`}>
                          {product.name}
                        </h4>
                        <div
                          className={`text-xs font-medium px-1.5 py-0.5 rounded-full text-white inline-block ${isTvMode ? "text-xs" : "text-[10px]"}`}
                          style={{ backgroundColor: product.color || "hsl(var(--primary))" }}
                        >
                          {Math.round((quantityPercentage + revenuePercentage) / 2)}%
                        </div>
                      </div>
                    </div>

                    {/* Meta de Quantidade - Compacta */}
                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between items-center">
                        <span className={`text-gray-400 ${isTvMode ? "text-xs" : "text-[10px]"}`}>
                          Qtd: {product.quantityCurrent}/{product.quantityTarget}
                        </span>
                        <span className={`font-bold ${quantityColor} ${isTvMode ? "text-xs" : "text-[10px]"}`}>
                          {quantityPercentage}%
                        </span>
                      </div>
                      <Progress value={quantityPercentage} className={`h-1.5 ${isTvMode ? "h-2" : ""} bg-gray-800`} />
                    </div>

                    {/* Meta de Faturamento - Compacta */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className={`text-gray-400 ${isTvMode ? "text-xs" : "text-[10px]"}`}>
                          {formatCurrency(product.revenueCurrent)}/{formatCurrency(product.revenueTarget)}
                        </span>
                        <span className={`font-bold ${revenueColor} ${isTvMode ? "text-xs" : "text-[10px]"}`}>
                          {revenuePercentage}%
                        </span>
                      </div>
                      <Progress value={revenuePercentage} className={`h-1.5 ${isTvMode ? "h-2" : ""} bg-gray-800`} />
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
