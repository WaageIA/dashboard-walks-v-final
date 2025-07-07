"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Award } from "lucide-react"
import type { DashboardData, PeriodSalesMetrics } from "@/types/dashboard"

interface ComercialTela01Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function ComercialTela01({ data, loading, isTvMode }: ComercialTela01Props) {
  // Estado para animação dos valores
  const [animate, setAnimate] = useState(false)

  // Iniciar animação após carregamento
  useEffect(() => {
    if (!loading) {
      setAnimate(true)
    }
  }, [loading])

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Função para obter cor da tendência
  const getTrendColor = (trend: number) => {
    return trend >= 0 ? "text-green-500" : "text-red-500"
  }

  // Função para obter ícone de tendência
  const getTrendIcon = (trend: number) => {
    const iconClass = "h-4 w-4"
    return trend >= 0 ? (
      <TrendingUp className={`${iconClass} text-green-500`} />
    ) : (
      <TrendingDown className={`${iconClass} text-red-500`} />
    )
  }

  // Cores para cada período
  const periodColors = {
    Semanal: {
      primary: "#3b82f6", // Azul
      secondary: "#1e40af",
      bg: "bg-blue-950/20",
      border: "border-blue-800/30",
      title: "text-blue-400",
      shadow: "shadow-blue-500/20",
      glow: "0 0 15px rgba(59, 130, 246, 0.5)",
    },
    Mensal: {
      primary: "#22c55e", // Verde
      secondary: "#16a34a",
      bg: "bg-green-950/20",
      border: "border-green-800/30",
      title: "text-green-400",
      shadow: "shadow-green-500/20",
      glow: "0 0 15px rgba(34, 197, 94, 0.5)",
    },
    Anual: {
      primary: "#a855f7", // Roxo
      secondary: "#9333ea",
      bg: "bg-purple-950/20",
      border: "border-purple-800/30",
      title: "text-purple-400",
      shadow: "shadow-purple-500/20",
      glow: "0 0 15px rgba(168, 85, 247, 0.5)",
    },
  }

  // Componente de gráfico circular grande
  const LargeCircularProgress = ({
    percentage,
    color,
    size = 150,
    glow,
  }: {
    percentage: number
    color: string
    size?: number
    glow: string
  }) => {
    const strokeWidth = 10
    const radius = size / 2
    const normalizedRadius = radius - strokeWidth / 2
    const circumference = normalizedRadius * 2 * Math.PI
    const strokeDasharray = `${circumference} ${circumference}`
    const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference

    return (
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg height={size} width={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            stroke="rgba(255,255,255,0.1)"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            style={{
              strokeDashoffset: animate ? strokeDashoffset : circumference,
              transition: "stroke-dashoffset 1.5s ease-out",
              filter: `drop-shadow(0 0 3px ${color})`,
              boxShadow: glow,
            }}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-3xl font-bold text-white"
            style={{
              textShadow: "0 0 10px rgba(0,0,0,0.5)",
              opacity: animate ? 1 : 0,
              transform: animate ? "scale(1)" : "scale(0.8)",
              transition: "all 0.8s ease-out 0.5s",
            }}
          >
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    )
  }

  // Componente de métrica individual
  const MetricCard = ({
    icon,
    title,
    value,
    meta,
    trend,
    percentage,
    color,
    delay = 0,
  }: {
    icon: React.ReactNode
    title: string
    value: string
    meta: string
    trend: number
    percentage: number
    color: string
    delay?: number
  }) => {
    return (
      <div
        className="flex-1 p-3 bg-gray-900/40 rounded-lg border border-gray-800/50 hover:bg-gray-900/60 transition-all duration-300"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(20px)",
          transition: `all 0.5s ease-out ${delay}s`,
        }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gray-800/70">{icon}</div>
            <span className="text-gray-400 text-xs">{title}</span>
          </div>
          <div className={`flex items-center gap-1 ${getTrendColor(trend)}`}>
            {getTrendIcon(trend)}
            <span className="text-xs font-medium">
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          </div>
        </div>

        <div className="mb-2">
          <div
            className="text-white text-xl font-bold mb-1"
            style={{
              opacity: animate ? 1 : 0,
              transform: animate ? "translateX(0)" : "translateX(-10px)",
              transition: `all 0.5s ease-out ${delay + 0.2}s`,
            }}
          >
            {value}
          </div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-gray-400 text-xs">Meta: {meta}</span>
            <span
              className={`text-xs font-bold ${
                percentage >= 100 ? "text-green-500" : percentage >= 90 ? "text-yellow-500" : "text-red-500"
              }`}
            >
              {Math.round(percentage)}%
            </span>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="relative h-1.5 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000 ease-out"
            style={{
              width: animate ? `${Math.min(percentage, 100)}%` : "0%",
              backgroundColor: color,
              boxShadow: `0 0 8px ${color}`,
              transition: `width 1s ease-out ${delay + 0.3}s`,
            }}
          />
        </div>
      </div>
    )
  }

  // Função para renderizar um período
  const renderPeriod = (periodData: PeriodSalesMetrics, index: number) => {
    const colors = periodColors[periodData.periodLabel]
    const salesPercentage = Math.round((periodData.totalSales.currentValue / periodData.totalSales.targetValue) * 100)
    const leadsPercentage = Math.round(
      (periodData.qualifiedLeads.currentValue / periodData.qualifiedLeads.targetValue) * 100,
    )
    const conversionPercentage = Math.round(
      (periodData.conversionRate.currentValue / periodData.conversionRate.targetValue) * 100,
    )

    // Calculando o ticket médio
    const ticketValue = periodData.totalSales.currentValue / periodData.qualifiedLeads.currentValue
    const ticketTarget = periodData.totalSales.targetValue / periodData.qualifiedLeads.targetValue
    const ticketPercentage = Math.round((ticketValue / ticketTarget) * 100)
    const ticketTrend = 5

    // Percentual geral (média ponderada das métricas principais)
    const overallPercentage = Math.round(salesPercentage * 0.4 + leadsPercentage * 0.3 + conversionPercentage * 0.3)

    return (
      <div
        key={periodData.periodLabel}
        className={`${colors.bg} ${colors.border} ${colors.shadow} border rounded-lg p-4 transition-all duration-500`}
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(30px)",
          transition: `all 0.7s ease-out ${index * 0.2}s`,
          boxShadow: animate ? colors.glow : "none",
        }}
      >
        <h3
          className={`text-center font-medium ${colors.title} text-lg uppercase tracking-wider mb-3`}
          style={{
            textShadow: `0 0 10px ${colors.primary}40`,
          }}
        >
          {periodData.periodLabel}
        </h3>

        <div className="flex items-center gap-4">
          {/* Gráfico circular à esquerda */}
          <div className="flex-shrink-0 text-center">
            <LargeCircularProgress
              percentage={overallPercentage}
              color={colors.primary}
              size={isTvMode ? 160 : 140}
              glow={colors.glow}
            />
            <div
              className="mt-2"
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.5s ease-out ${index * 0.2 + 0.5}s`,
              }}
            >
              <p className="text-gray-400 text-xs mb-0.5">Status da Meta</p>
              <p className={`text-base font-bold ${colors.title}`}>{overallPercentage}%</p>
            </div>
          </div>

          {/* Métricas horizontais à direita */}
          <div className="flex-1 grid grid-cols-4 gap-2">
            <MetricCard
              icon={<DollarSign className="h-4 w-4 text-green-500" />}
              title="Vendas Totais"
              value={formatCurrency(periodData.totalSales.currentValue)}
              meta={formatCurrency(periodData.totalSales.targetValue)}
              trend={periodData.totalSales.trendPercent}
              percentage={salesPercentage}
              color={colors.primary}
              delay={index * 0.1 + 0.1}
            />

            <MetricCard
              icon={<Target className="h-4 w-4 text-blue-500" />}
              title="Leads Qualificados"
              value={periodData.qualifiedLeads.currentValue.toString()}
              meta={periodData.qualifiedLeads.targetValue.toString()}
              trend={periodData.qualifiedLeads.trendPercent}
              percentage={leadsPercentage}
              color={colors.primary}
              delay={index * 0.1 + 0.2}
            />

            <MetricCard
              icon={<Users className="h-4 w-4 text-purple-500" />}
              title="Taxa de Conversão"
              value={`${periodData.conversionRate.currentValue}%`}
              meta={`${periodData.conversionRate.targetValue}%`}
              trend={periodData.conversionRate.trendPercent}
              percentage={conversionPercentage}
              color={colors.primary}
              delay={index * 0.1 + 0.3}
            />

            <MetricCard
              icon={<Award className="h-4 w-4 text-orange-500" />}
              title="Ticket Médio"
              value={formatCurrency(ticketValue)}
              meta={formatCurrency(ticketTarget)}
              trend={ticketTrend}
              percentage={ticketPercentage}
              color={colors.primary}
              delay={index * 0.1 + 0.4}
            />
          </div>
        </div>
      </div>
    )
  }

  // Estado de carregamento
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"} mb-4`}>
            Carregando Métricas Comerciais...
          </h2>
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-36 bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Verificar se há dados
  if (!data?.commercialPeriodicMetrics || data.commercialPeriodicMetrics.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
          Dados de métricas comerciais não disponíveis
        </h2>
        <p className={`text-gray-400 mt-4 ${isTvMode ? "text-xl" : "text-lg"}`}>
          Verifique a conexão com a API ou os dados mockados
        </p>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col p-4 overflow-hidden">
      {/* Título da Página */}
      <div
        className="text-center mb-4"
        style={{
          opacity: animate ? 1 : 0,
          transform: animate ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.7s ease-out",
        }}
      >
        <h2 className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"} mb-1`}>
          Métricas Comerciais por Período
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
          Performance de vendas: Semanal, Mensal e Anual
        </p>
      </div>

      {/* Períodos */}
      <div className="flex-1 grid grid-rows-3 gap-4">
        {data.commercialPeriodicMetrics.map((periodData, index) => renderPeriod(periodData, index))}
      </div>
    </div>
  )
}
