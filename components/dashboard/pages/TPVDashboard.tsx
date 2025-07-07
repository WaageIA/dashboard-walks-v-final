"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Wifi,
  CheckCircle,
  Timer,
  Users,
  AlertTriangle,
  AlertCircle,
  Info,
  RotateCcw,
  MapPin,
} from "lucide-react"
import { generateTPVData } from "@/lib/tpvMockData"
import type { TPVDashboardData } from "@/types/tpv"

interface TPVDashboardProps {
  data: any
  loading: boolean
  isTvMode: boolean
}

export default function TPVDashboard({ data, loading, isTvMode }: TPVDashboardProps) {
  const [tpvData, setTpvData] = useState<TPVDashboardData | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Função para atualizar dados
  const refreshData = async () => {
    setIsRefreshing(true)
    // Simular delay de API
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
          <p className="text-gray-400 text-lg">Carregando Dashboard TPV...</p>
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

  const formatPercentage = (value: number) => {
    if (value >= 100) {
      return `${(value / 10).toFixed(1)}%`
    }
    return `${value}%`
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

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-400" />
      default:
        return <Info className="h-4 w-4 text-blue-400" />
    }
  }

  return (
    <div className={`space-y-6 ${isTvMode ? "space-y-8" : ""}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <div className="bg-blue-600 p-2 rounded-lg mr-3">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h1 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-3xl"}`}>
            WALKS BANK TPV - DASHBOARD CONSOLIDADO
          </h1>
        </div>
        <div className="flex items-center justify-center space-x-4 text-gray-400">
          <span className={isTvMode ? "text-lg" : "text-sm"}>Visão Geral Executiva | Tempo Real</span>
          <div className="flex items-center space-x-2">
            <RotateCcw className={`${isRefreshing ? "animate-spin" : ""} ${isTvMode ? "h-5 w-5" : "h-4 w-4"}`} />
            <span className={isTvMode ? "text-sm" : "text-xs"}>
              Última atualização: {tpvData.lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* KPIs Principais */}
        <div className="lg:col-span-1">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">📊 KPIs PRINCIPAIS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TPV Hoje */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    TPV HOJE
                  </span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(tpvData.metrics.tpvToday.trend)}
                    <span className={`text-sm ${getTrendColor(tpvData.metrics.tpvToday.trend)}`}>
                      +{tpvData.metrics.tpvToday.trend}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(tpvData.metrics.tpvToday.value)}
                </div>
              </div>

              {/* TPV Mês */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">📅 TPV MÊS</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(tpvData.metrics.tpvMonth.trend)}
                    <span className={`text-sm ${getTrendColor(tpvData.metrics.tpvMonth.trend)}`}>
                      +{tpvData.metrics.tpvMonth.trend}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {formatCurrency(tpvData.metrics.tpvMonth.value)}
                </div>
              </div>

              {/* Meta */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    META
                  </span>
                  <span className="text-xs text-gray-500">{formatCurrency(tpvData.metrics.tpvMonth.target)} meta</span>
                </div>
                <div className="text-2xl font-bold text-green-400">{tpvData.metrics.targetPercentage.value}%</div>
              </div>

              {/* Tempo Real */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">⚡ TEMPO REAL</span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(tpvData.metrics.realTimeTransactions.trend)}
                    <span className={`text-sm ${getTrendColor(tpvData.metrics.realTimeTransactions.trend)}`}>
                      +{tpvData.metrics.realTimeTransactions.trend}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {tpvData.metrics.realTimeTransactions.value}/min
                </div>
              </div>

              {/* Terminais */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Wifi className="h-4 w-4 mr-1" />
                    TERMINAIS
                  </span>
                  <span className="text-xs text-gray-500">Online</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {Math.round((tpvData.metrics.terminalsOnline.value / tpvData.metrics.terminalsOnline.total) * 100)}%
                </div>
              </div>

              {/* Aprovação */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    APROVAÇÃO
                  </span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(tpvData.metrics.approvalRate.trend)}
                    <span className={`text-sm ${getTrendColor(tpvData.metrics.approvalRate.trend)}`}>
                      {tpvData.metrics.approvalRate.trend > 0 ? "+" : ""}
                      {(tpvData.metrics.approvalRate.trend / 10).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {formatPercentage(tpvData.metrics.approvalRate.value)}
                </div>
              </div>

              {/* Resposta Média */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    RESP. MÉDIA
                  </span>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(tpvData.metrics.responseTime.trend)}
                    <span className={`text-sm ${getTrendColor(tpvData.metrics.responseTime.trend)}`}>
                      {tpvData.metrics.responseTime.trend > 0 ? "+" : ""}
                      {(tpvData.metrics.responseTime.trend / 10).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {(tpvData.metrics.responseTime.value / 10).toFixed(1)}s
                </div>
              </div>

              {/* Clientes */}
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    CLIENTES
                  </span>
                  <span className="text-xs text-green-400">+{tpvData.metrics.clients.todayIncrease} hoje</span>
                </div>
                <div className="text-2xl font-bold text-green-400">
                  {tpvData.metrics.clients.value.toLocaleString("pt-BR")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Central */}
        <div className="lg:col-span-1 space-y-6">
          {/* Top Clientes TPV */}
          <Card className="bg-gray-900/50 border-gray-800 h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center">🏆 TOP CLIENTES TPV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tpvData.topClients.slice(0, 10).map((client) => (
                  <div key={client.rank} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {client.rank}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{client.name}</div>
                        <div className="text-gray-400 text-xs flex items-center">
                          <span className="mr-1">{client.categoryIcon}</span>
                          {client.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-sm">{formatCurrency(client.value)}</div>
                      <div className={`text-xs flex items-center justify-end ${getTrendColor(client.trend)}`}>
                        {getTrendIcon(client.trend)}
                        <span className="ml-1">
                          {client.trend > 0 ? "+" : ""}
                          {client.trend.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita */}
        <div className="lg:col-span-1 space-y-6">
          {/* Distribuição Geográfica */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">🗺️ DISTRIBUIÇÃO GEOGRÁFICA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Header do Ranking */}
                <div className="bg-gray-800/30 rounded-lg p-4 text-center">
                  <MapPin className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-medium mb-1">Ranking Nacional TPV</div>
                  <div className="text-gray-400 text-sm">Estados do Brasil</div>
                </div>

                {/* Ranking dos Estados */}
                <div className="space-y-2">
                  {tpvData.geographic.map((state, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-800/20 rounded-lg hover:bg-gray-800/40 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-gray-300 text-sm font-medium">{state.region}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-400 text-sm font-bold">{formatCurrency(state.value)}</span>
                        <div className={`flex items-center space-x-1 ${getTrendColor(state.percentage)}`}>
                          {getTrendIcon(state.percentage)}
                          <span className="text-xs font-medium">
                            {state.percentage > 0 ? "+" : ""}
                            {state.percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resumo Total */}
                <div className="bg-gray-800/30 rounded-lg p-3 border-t border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">Total Nacional:</span>
                    <span className="text-green-400 font-bold">
                      {formatCurrency(tpvData.geographic.reduce((sum, state) => sum + state.value, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alertas Críticos */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">🚨 ALERTAS CRÍTICOS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tpvData.alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-800/30 rounded-lg">
                    <div className="flex-shrink-0 mt-0.5">{getAlertIcon(alert.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium truncate">{alert.title}</span>
                        <span className="text-gray-400 text-xs ml-2">{alert.time}</span>
                      </div>
                      <p className="text-gray-400 text-xs">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
