"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award,
  Zap,
  RotateCcw,
  DollarSign,
} from "lucide-react"
import { generateTPVData } from "@/lib/tpvMockData"
import type { TPVDashboardData } from "@/types/tpv"

interface TPVTela02Props {
  data: any
  loading: boolean
  isTvMode: boolean
}

export default function TPVTela02({ data, loading, isTvMode }: TPVTela02Props) {
  const [tpvData, setTpvData] = useState<TPVDashboardData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Função para atualizar dados
  const refreshData = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setTpvData(generateTPVData())
    setIsRefreshing(false)
  }

  // Carregar dados iniciais
  useEffect(() => {
    refreshData()
  }, [])

  // Auto-refresh a cada 20 segundos
  useEffect(() => {
    const interval = setInterval(refreshData, 20000)
    return () => clearInterval(interval)
  }, [])

  if (!tpvData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Carregando TPV Resumo Geral...</p>
        </div>
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`
    }
    if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`
    }
    return `R$ ${value.toLocaleString("pt-BR")}`
  }

  const getTrendIcon = (trend: number) => {
    return trend >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-400" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-400" />
    )
  }

  const getTrendColor = (trend: number) => {
    return trend >= 0 ? "text-green-400" : "text-red-400"
  }

  return (
    <div className={`space-y-6 ${isTvMode ? "space-y-8" : ""}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <h1 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-3xl"}`}>
            TPV RESUMO GERAL - VISÃO EXECUTIVA
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-4 text-gray-400">
          <span className={isTvMode ? "text-lg" : "text-sm"}>Análise Completa de Performance | Tempo Real</span>
          <div className="flex items-center space-x-2">
            <RotateCcw className={`${isRefreshing ? "animate-spin" : ""} ${isTvMode ? "h-5 w-5" : "h-4 w-4"}`} />
            <span className={isTvMode ? "text-sm" : "text-xs"}>
              Última atualização: {tpvData.lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Resumo Executivo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">TPV Total Mês</p>
                <p className="text-white text-2xl font-bold">{formatCurrency(tpvData.metrics.tpvMonth.value)}</p>
                <div className="flex items-center mt-1">
                  {getTrendIcon(tpvData.monthlyComparison.growth)}
                  <span className="text-blue-100 text-sm ml-1">
                    {tpvData.monthlyComparison.growth > 0 ? "+" : ""}
                    {tpvData.monthlyComparison.growth.toFixed(1)}% vs mês anterior
                  </span>
                </div>
              </div>
              <DollarSign className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Meta Atingida</p>
                <p className="text-white text-2xl font-bold">
                  {tpvData.monthlyComparison.currentMonth.achievement.toFixed(1)}%
                </p>
                <p className="text-green-100 text-sm">
                  {formatCurrency(tpvData.monthlyComparison.currentMonth.target)} meta
                </p>
              </div>
              <Target className="h-12 w-12 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Eficiência</p>
                <p className="text-white text-2xl font-bold">{tpvData.performance.efficiency}%</p>
                <p className="text-purple-100 text-sm">Performance geral</p>
              </div>
              <Zap className="h-12 w-12 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600 to-orange-700 border-orange-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Crescimento</p>
                <p className="text-white text-2xl font-bold">+{tpvData.performance.growth}%</p>
                <p className="text-orange-100 text-sm">Tendência anual</p>
              </div>
              <Activity className="h-12 w-12 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparativo Mensal */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              COMPARATIVO MENSAL
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Mês Atual */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Mês Atual</span>
                <span className="text-green-400 font-bold">
                  {formatCurrency(tpvData.monthlyComparison.currentMonth.value)}
                </span>
              </div>
              <Progress value={tpvData.monthlyComparison.currentMonth.achievement} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Meta: {formatCurrency(tpvData.monthlyComparison.currentMonth.target)}
                </span>
                <span className="text-green-400">{tpvData.monthlyComparison.currentMonth.achievement.toFixed(1)}%</span>
              </div>
            </div>

            {/* Mês Anterior */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">Mês Anterior</span>
                <span className="text-blue-400 font-bold">
                  {formatCurrency(tpvData.monthlyComparison.previousMonth.value)}
                </span>
              </div>
              <Progress value={tpvData.monthlyComparison.previousMonth.achievement} className="h-3" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Meta: {formatCurrency(tpvData.monthlyComparison.previousMonth.target)}
                </span>
                <span className="text-blue-400">{tpvData.monthlyComparison.previousMonth.achievement.toFixed(1)}%</span>
              </div>
            </div>

            {/* Crescimento */}
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Crescimento</span>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(tpvData.monthlyComparison.growth)}
                  <span className={`font-bold ${getTrendColor(tpvData.monthlyComparison.growth)}`}>
                    {tpvData.monthlyComparison.growth > 0 ? "+" : ""}
                    {tpvData.monthlyComparison.growth.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gráfico Temporal (movido da Tela01) */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              GRÁFICO TEMPORAL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-end justify-between h-40 space-x-1">
                {tpvData.hourlyData.map((hour, index) => {
                  const maxValue = Math.max(...tpvData.hourlyData.map((h) => h.value))
                  const height = (hour.value / maxValue) * 100

                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div
                        className="bg-gradient-to-t from-green-600 to-green-400 rounded-t w-full transition-all duration-500 hover:from-green-500 hover:to-green-300"
                        style={{ height: `${height}%` }}
                        title={`${hour.hour}: ${formatCurrency(hour.value)}`}
                      />
                      <span className="text-xs text-gray-400 mt-2 transform -rotate-45 origin-center">{hour.hour}</span>
                    </div>
                  )
                })}
              </div>
              <div className="text-center text-gray-400 text-sm">TPV por Hora - Últimas 8h</div>
              <div className="bg-gray-800/30 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Média por Hora:</span>
                  <span className="text-green-400 font-bold">
                    {formatCurrency(
                      tpvData.hourlyData.reduce((sum, h) => sum + h.value, 0) / tpvData.hourlyData.length,
                    )}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance por Categoria */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              PERFORMANCE POR CATEGORIA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tpvData.categoryData.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-gray-300 text-sm font-medium">{category.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-bold text-sm">{formatCurrency(category.value)}</span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(category.trend)}
                        <span className={`text-xs ${getTrendColor(category.trend)}`}>+{category.trend}%</span>
                      </div>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                  <div className="text-right">
                    <span className="text-gray-400 text-xs">{category.percentage}% do total</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Performance */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Award className="h-5 w-5 mr-2" />
              MÉTRICAS DE PERFORMANCE
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Eficiência */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Eficiência Operacional</span>
                <span className="text-green-400 font-bold">{tpvData.performance.efficiency}%</span>
              </div>
              <Progress value={tpvData.performance.efficiency} className="h-3" />
            </div>

            {/* Disponibilidade */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Disponibilidade Sistema</span>
                <span className="text-blue-400 font-bold">{tpvData.performance.availability}%</span>
              </div>
              <Progress value={tpvData.performance.availability} className="h-3" />
            </div>

            {/* Satisfação */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Satisfação Cliente</span>
                <span className="text-purple-400 font-bold">{tpvData.performance.satisfaction}%</span>
              </div>
              <Progress value={tpvData.performance.satisfaction} className="h-3" />
            </div>

            {/* Crescimento */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Taxa de Crescimento</span>
                <span className="text-orange-400 font-bold">+{tpvData.performance.growth}%</span>
              </div>
              <Progress value={tpvData.performance.growth} className="h-3" />
            </div>

            {/* Resumo Geral */}
            <div className="bg-gray-800/50 p-4 rounded-lg mt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {Math.round(
                    (tpvData.performance.efficiency +
                      tpvData.performance.availability +
                      tpvData.performance.satisfaction) /
                      3,
                  )}
                  %
                </div>
                <div className="text-gray-400 text-sm">Score Geral de Performance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
