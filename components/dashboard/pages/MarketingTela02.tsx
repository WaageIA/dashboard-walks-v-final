"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  BarChart3,
  Target,
  MousePointer,
} from "lucide-react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface MarketingTela02Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function MarketingTela02({ data, loading, isTvMode }: MarketingTela02Props) {
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

  // Dados de performance de campanhas (últimos 6 meses)
  const campaignPerformance = [
    { mes: "Jul", investimento: 15000, leads: 320, roi: 240 },
    { mes: "Ago", investimento: 18000, leads: 380, roi: 280 },
    { mes: "Set", investimento: 22000, leads: 450, roi: 320 },
    { mes: "Out", investimento: 20000, leads: 420, roi: 300 },
    { mes: "Nov", investimento: 25000, leads: 520, roi: 350 },
    { mes: "Dez", investimento: 28000, leads: 580, roi: 380 },
  ]

  // Dados de crescimento das redes sociais
  const socialMediaGrowth = [
    { plataforma: "Instagram", seguidores: 18500, crescimento: 15, engajamento: 4.2 },
    { plataforma: "Facebook", seguidores: 12800, crescimento: 8, engajamento: 3.1 },
    { plataforma: "LinkedIn", seguidores: 8900, crescimento: 22, engajamento: 5.8 },
    { plataforma: "YouTube", seguidores: 5100, crescimento: 35, engajamento: 6.5 },
  ]

  // Métricas de engajamento do site
  const siteEngagement = [
    { metric: "Tempo na Página", value: "2:45", target: "2:30", status: "good" },
    { metric: "Taxa de Rejeição", value: "68.5%", target: "70%", status: "good" },
    { metric: "Páginas por Sessão", value: "3.2", target: "3.0", status: "good" },
    { metric: "Taxa de Conversão", value: "2.8%", target: "3.0%", status: "warning" },
  ]

  const getSocialIcon = (platform: string) => {
    const iconClass = isTvMode ? "h-6 w-6" : "h-5 w-5"
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className={`${iconClass} text-pink-400`} />
      case "facebook":
        return <Facebook className={`${iconClass} text-blue-400`} />
      case "linkedin":
        return <Linkedin className={`${iconClass} text-blue-300`} />
      case "youtube":
        return <Youtube className={`${iconClass} text-red-400`} />
      default:
        return <Users className={iconClass} />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "danger":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            Carregando Campanhas e Engajamento...
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
          Campanhas e Engajamento Digital
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Performance de campanhas, redes sociais e engajamento no site
        </p>
      </div>

      {/* Seção Superior - Gráfico de Performance */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-2xl" : "text-xl"}`}>
            <BarChart3 className={isTvMode ? "h-8 w-8" : "h-6 w-6"} />
            Performance de Campanhas - Últimos 6 Meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
            <AreaChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="mes" stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
              <YAxis stroke="#9CA3AF" fontSize={isTvMode ? 14 : 12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111827",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                  color: "white",
                }}
                formatter={(value: number, name: string) => {
                  if (name === "investimento") return [formatCurrency(value), "Investimento"]
                  if (name === "leads") return [value, "Leads"]
                  if (name === "roi") return [`${value}%`, "ROI"]
                  return [value, name]
                }}
              />
              <Area
                type="monotone"
                dataKey="investimento"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Area type="monotone" dataKey="leads" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Seção Inferior - 3 Colunas */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Desempenho em Redes Sociais */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-xl" : "text-lg"}`}>
              <Users className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
              Redes Sociais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialMediaGrowth.map((platform, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSocialIcon(platform.plataforma)}
                    <div>
                      <h4 className={`font-semibold text-white ${isTvMode ? "text-base" : "text-sm"}`}>
                        {platform.plataforma}
                      </h4>
                      <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>
                        {formatNumber(platform.seguidores)} seguidores
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-green-500">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-semibold text-xs">+{platform.crescimento}%</span>
                    </div>
                    <div className={`text-gray-400 ${isTvMode ? "text-xs" : "text-[10px]"}`}>
                      {platform.engajamento}% engajamento
                    </div>
                  </div>
                </div>
                <Progress value={platform.crescimento * 2} className="h-1 bg-gray-700" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Campanhas Ativas Detalhadas */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-xl" : "text-lg"}`}>
              <Target className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
              Campanhas Ativas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.campaigns.map((campaign, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium text-white ${isTvMode ? "text-base" : "text-sm"}`}>{campaign.name}</h4>
                  <Badge
                    className={`bg-green-500/20 text-green-400 border-green-500/30 ${isTvMode ? "text-xs" : "text-[10px]"}`}
                  >
                    ROI: {campaign.roi}%
                  </Badge>
                </div>

                <div className={`grid grid-cols-2 gap-2 mb-2 ${isTvMode ? "text-sm" : "text-xs"}`}>
                  <div>
                    <div className="text-gray-400">Investido</div>
                    <div className="font-bold text-white">{formatCurrency(campaign.spent)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Conversões</div>
                    <div className="font-bold text-white">{campaign.conversions}</div>
                  </div>
                </div>

                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Performance</span>
                    <span className="text-green-400">{Math.min(campaign.roi / 2, 100)}%</span>
                  </div>
                  <Progress value={Math.min(campaign.roi / 2, 100)} className="h-1 bg-gray-700" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Engajamento no Site */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white flex items-center gap-3 ${isTvMode ? "text-xl" : "text-lg"}`}>
              <MousePointer className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
              Engajamento no Site
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {siteEngagement.map((item, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>{item.metric}</span>
                  <span className={`font-bold ${getStatusColor(item.status)} ${isTvMode ? "text-base" : "text-sm"}`}>
                    {item.value}
                  </span>
                </div>
                <div className={`text-gray-500 ${isTvMode ? "text-xs" : "text-[10px]"}`}>Meta: {item.target}</div>
              </div>
            ))}

            {/* Plano de Ação */}
            <div className="mt-4 p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <h5 className={`text-blue-400 font-medium mb-2 ${isTvMode ? "text-sm" : "text-xs"}`}>Próximas Ações</h5>
              <div className="space-y-1">
                <div className={`text-gray-300 ${isTvMode ? "text-xs" : "text-[10px]"}`}>• Otimizar landing pages</div>
                <div className={`text-gray-300 ${isTvMode ? "text-xs" : "text-[10px]"}`}>• A/B test CTAs</div>
                <div className={`text-gray-300 ${isTvMode ? "text-xs" : "text-[10px]"}`}>• Expandir LinkedIn Ads</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
