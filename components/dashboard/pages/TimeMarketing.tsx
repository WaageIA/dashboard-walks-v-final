"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  TrendingDown,
  Globe,
  Target,
  Eye,
  MousePointer,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Search,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import type { DashboardData } from "@/types/dashboard"

interface TimeMarketingProps {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function TimeMarketing({ data, loading, isTvMode }: TimeMarketingProps) {
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

  // Dados específicos do time de marketing
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

  const campaignPerformance = [
    { mes: "Jan", investimento: 15000, leads: 320, roi: 240 },
    { mes: "Fev", investimento: 18000, leads: 380, roi: 280 },
    { mes: "Mar", investimento: 22000, leads: 450, roi: 320 },
    { mes: "Abr", investimento: 20000, leads: 420, roi: 300 },
    { mes: "Mai", investimento: 25000, leads: 520, roi: 350 },
    { mes: "Jun", investimento: 28000, leads: 580, roi: 380 },
  ]

  const socialMediaGrowth = [
    { plataforma: "Instagram", seguidores: 18500, crescimento: 15, engajamento: 4.2 },
    { plataforma: "Facebook", seguidores: 12800, crescimento: 8, engajamento: 3.1 },
    { plataforma: "LinkedIn", seguidores: 8900, crescimento: 22, engajamento: 5.8 },
    { plataforma: "YouTube", seguidores: 5100, crescimento: 35, engajamento: 6.5 },
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

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]

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
      {/* Métricas do Marketing */}
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
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
                  <div
                    className={`flex items-center space-x-1 ${metric.trend >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {metric.trend >= 0 ? (
                      <TrendingUp className={isTvMode ? "h-5 w-5" : "h-4 w-4"} />
                    ) : (
                      <TrendingDown className={isTvMode ? "h-5 w-5" : "h-4 w-4"} />
                    )}
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

      {/* Gráficos de Performance */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Performance de Campanhas */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
              Performance de Campanhas - 6 Meses
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

        {/* Leads por Canal */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
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
          </CardContent>
        </Card>
      </div>

      {/* Redes Sociais e Campanhas */}
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Crescimento das Redes Sociais */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
              Crescimento das Redes Sociais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {socialMediaGrowth.map((platform, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSocialIcon(platform.plataforma)}
                    <div>
                      <h4 className={`font-semibold text-white ${isTvMode ? "text-lg" : "text-base"}`}>
                        {platform.plataforma}
                      </h4>
                      <p className={`text-gray-400 ${isTvMode ? "text-base" : "text-sm"}`}>
                        {formatNumber(platform.seguidores)} seguidores
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`flex items-center space-x-1 text-green-500`}>
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-semibold">+{platform.crescimento}%</span>
                    </div>
                    <div className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>
                      {platform.engajamento}% engajamento
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Crescimento mensal</span>
                    <span className="text-green-400">+{platform.crescimento}%</span>
                  </div>
                  <Progress value={platform.crescimento * 2} className="h-2 bg-gray-700" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Campanhas Ativas Detalhadas */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
              Campanhas Ativas - Detalhamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.campaigns.map((campaign, index) => (
              <div key={index} className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium text-white ${isTvMode ? "text-lg" : "text-base"}`}>{campaign.name}</h4>
                  <Badge
                    className={`bg-green-500/20 text-green-400 border-green-500/30 ${isTvMode ? "text-sm" : "text-xs"}`}
                  >
                    ROI: {campaign.roi}%
                  </Badge>
                </div>

                <div className={`grid grid-cols-2 gap-4 mb-3 ${isTvMode ? "text-base" : "text-sm"}`}>
                  <div>
                    <div className="text-gray-400">Investido</div>
                    <div className="font-bold text-white">{formatCurrency(campaign.spent)}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Conversões</div>
                    <div className="font-bold text-white">{campaign.conversions}</div>
                  </div>
                </div>

                <div className={`grid grid-cols-3 gap-4 ${isTvMode ? "text-sm" : "text-xs"}`}>
                  <div className="text-center">
                    <div className="text-gray-400">CPL</div>
                    <div className="font-bold text-white">{formatCurrency(campaign.spent / campaign.conversions)}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">CTR</div>
                    <div className="font-bold text-white">{(Math.random() * 3 + 1).toFixed(1)}%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">Impressões</div>
                    <div className="font-bold text-white">
                      {formatNumber(Math.floor(Math.random() * 50000) + 10000)}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Performance</span>
                    <span className="text-green-400">{Math.min(campaign.roi / 2, 100)}%</span>
                  </div>
                  <Progress value={Math.min(campaign.roi / 2, 100)} className="h-2 bg-gray-700" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Análise de Canais e Métricas Avançadas */}
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isTvMode ? "gap-10" : ""}`}>
        {/* Análise de Tráfego */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Análise de Tráfego</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-blue-400" />
                  <span className="text-white">Orgânico</span>
                </div>
                <span className="text-white font-bold">45.2%</span>
              </div>
              <Progress value={45.2} className="h-2 bg-gray-700" />
            </div>

            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-green-400" />
                  <span className="text-white">Pago</span>
                </div>
                <span className="text-white font-bold">32.8%</span>
              </div>
              <Progress value={32.8} className="h-2 bg-gray-700" />
            </div>

            <div className="p-3 rounded-lg bg-gray-800/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span className="text-white">Social</span>
                </div>
                <span className="text-white font-bold">22.0%</span>
              </div>
              <Progress value={22.0} className="h-2 bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Engajamento */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Métricas de Engajamento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 rounded-lg bg-gray-800/50">
              <div className="text-2xl font-bold text-white mb-1">2:45</div>
              <div className="text-gray-400 text-sm">Tempo médio na página</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-gray-800/50">
              <div className="text-2xl font-bold text-white mb-1">68.5%</div>
              <div className="text-gray-400 text-sm">Taxa de rejeição</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-gray-800/50">
              <div className="text-2xl font-bold text-white mb-1">3.2</div>
              <div className="text-gray-400 text-sm">Páginas por sessão</div>
            </div>
          </CardContent>
        </Card>

        {/* Próximas Ações */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className={`text-white ${isTvMode ? "text-xl" : "text-lg"}`}>Próximas Ações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-blue-600/10 border border-blue-600/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-white font-medium">Otimizar Google Ads</span>
              </div>
              <p className="text-gray-400 text-sm">Ajustar palavras-chave com baixo CTR</p>
            </div>

            <div className="p-3 rounded-lg bg-green-600/10 border border-green-600/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-white font-medium">Expandir LinkedIn</span>
              </div>
              <p className="text-gray-400 text-sm">Aumentar investimento em 30%</p>
            </div>

            <div className="p-3 rounded-lg bg-yellow-600/10 border border-yellow-600/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-white font-medium">A/B Test Email</span>
              </div>
              <p className="text-gray-400 text-sm">Testar novos templates</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
