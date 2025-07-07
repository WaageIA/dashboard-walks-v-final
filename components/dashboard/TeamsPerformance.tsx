"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Users, Target, Instagram, Facebook, Linkedin, Youtube } from "lucide-react"
import type { SalesTeamMember, SalesFunnelStep, SocialMediaMetric, Campaign } from "@/types/dashboard"

interface TeamsPerformanceProps {
  salesTeam: SalesTeamMember[]
  salesFunnel: SalesFunnelStep[]
  socialMedia: SocialMediaMetric[]
  campaigns: Campaign[]
  loading: boolean
  isTvMode: boolean
}

export default function TeamsPerformance({
  salesTeam,
  salesFunnel,
  socialMedia,
  campaigns,
  loading,
  isTvMode,
}: TeamsPerformanceProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="backdrop-blur-md bg-white/10 border-white/20 animate-pulse">
            <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
              <div className="h-60 bg-white/10 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

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

  const getSocialIcon = (platform: string) => {
    const iconClass = isTvMode ? "h-6 w-6" : "h-5 w-5"
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className={iconClass} />
      case "facebook":
        return <Facebook className={iconClass} />
      case "linkedin":
        return <Linkedin className={iconClass} />
      case "youtube":
        return <Youtube className={iconClass} />
      default:
        return <Users className={iconClass} />
    }
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isTvMode ? "gap-8" : ""}`}>
      {/* Time Comercial */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className={`text-white flex items-center gap-2 ${isTvMode ? "text-2xl" : "text-lg"}`}>
            <Target className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
            Time Comercial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {salesTeam.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>{member.name}</h4>
                  <Badge className={`${getStatusColor(member.status)} ${isTvMode ? "text-sm" : "text-xs"}`}>
                    {member.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-gray-300 ${isTvMode ? "text-base" : "text-sm"}`}>
                    {formatCurrency(member.sales)}
                  </span>
                  <span className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
                    {member.percentage}% da meta
                  </span>
                </div>
                <Progress value={member.percentage} className="mt-2 h-2 bg-white/10" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Funil de Vendas */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className={`text-white flex items-center gap-2 ${isTvMode ? "text-2xl" : "text-lg"}`}>
            <TrendingDown className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
            Funil de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {salesFunnel.map((step, index) => (
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
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                  style={{ width: `${(step.count / salesFunnel[0].count) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Redes Sociais */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className={`text-white flex items-center gap-2 ${isTvMode ? "text-2xl" : "text-lg"}`}>
            <Users className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
            Redes Sociais
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialMedia.map((platform, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3 mb-3">
                {getSocialIcon(platform.platform)}
                <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>
                  {platform.platform}
                </h4>
              </div>
              <div className={`grid grid-cols-3 gap-4 ${isTvMode ? "text-base" : "text-sm"}`}>
                <div className="text-center">
                  <div className="text-gray-400">Seguidores</div>
                  <div className="font-bold text-white">{formatNumber(platform.followers)}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Engajamento</div>
                  <div className="font-bold text-white">{formatNumber(platform.engagement)}</div>
                </div>
                <div className="text-center">
                  <div className="text-gray-400">Alcance</div>
                  <div className="font-bold text-white">{formatNumber(platform.reach)}</div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Campanhas Ativas */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className={`text-white flex items-center gap-2 ${isTvMode ? "text-2xl" : "text-lg"}`}>
            <TrendingUp className={isTvMode ? "h-6 w-6" : "h-5 w-5"} />
            Campanhas Ativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {campaigns.map((campaign, index) => (
            <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>{campaign.name}</h4>
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
  )
}
