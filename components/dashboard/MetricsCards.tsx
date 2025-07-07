"use client"

import { TrendingUp, TrendingDown, Users, Target, DollarSign, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Metric } from "@/types/dashboard"

interface MetricsCardsProps {
  metrics: Metric[]
  loading: boolean
  isTvMode: boolean
}

export default function MetricsCards({ metrics, loading, isTvMode }: MetricsCardsProps) {
  const getIcon = (type: string) => {
    const iconClass = isTvMode ? "h-8 w-8" : "h-6 w-6"
    switch (type) {
      case "sales":
        return <DollarSign className={iconClass} />
      case "leads":
        return <Target className={iconClass} />
      case "followers":
        return <Users className={iconClass} />
      case "conversion":
        return <Zap className={iconClass} />
      default:
        return <TrendingUp className={iconClass} />
    }
  }

  const getTrendIcon = (trend: number) => {
    const iconClass = isTvMode ? "h-5 w-5" : "h-4 w-4"
    return trend >= 0 ? <TrendingUp className={iconClass} /> : <TrendingDown className={iconClass} />
  }

  const getTrendColor = (trend: number) => {
    return trend >= 0 ? "text-green-400" : "text-red-400"
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 100) return "text-green-400"
    if (percentage >= 80) return "text-yellow-400"
    return "text-red-400"
  }

  if (loading) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ${isTvMode ? "gap-6" : ""}`}>
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="backdrop-blur-md bg-white/10 border-white/20 animate-pulse">
            <CardContent className={`p-4 ${isTvMode ? "p-6" : ""}`}>
              <div className="h-20 bg-white/10 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 ${isTvMode ? "gap-6" : ""}`}>
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 group"
        >
          <CardContent className={`p-4 ${isTvMode ? "p-6" : ""}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all">
                {getIcon(metric.type)}
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
                <span className={`font-semibold ${isTvMode ? "text-base" : "text-sm"}`}>
                  {metric.trend > 0 ? "+" : ""}
                  {metric.trend}%
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className={`text-gray-300 ${isTvMode ? "text-lg" : "text-sm"}`}>{metric.title}</h3>
              <p className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>{metric.value}</p>

              {metric.target && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Meta: {metric.target}</span>
                    <span className={`font-semibold ${getPerformanceColor(metric.percentage || 0)}`}>
                      {metric.percentage}%
                    </span>
                  </div>
                  <Progress value={metric.percentage} className="h-2 bg-white/10" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
