"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import type { SalesData, MarketingData } from "@/types/dashboard"

interface ChartsSectionProps {
  salesData: SalesData[]
  marketingData: MarketingData[]
  loading: boolean
  isTvMode: boolean
}

export default function ChartsSection({ salesData, marketingData, loading, isTvMode }: ChartsSectionProps) {
  if (loading) {
    return (
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="backdrop-blur-md bg-white/10 border-white/20 animate-pulse">
            <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
              <div className="h-80 bg-white/10 rounded"></div>
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
    return new Intl.NumberFormat("pt-BR").format(value)
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isTvMode ? "gap-8" : ""}`}>
      {/* Vendas vs Meta */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
            Vendas vs Meta - Últimos 30 dias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="day" stroke="rgba(255,255,255,0.7)" fontSize={isTvMode ? 14 : 12} />
              <YAxis stroke="rgba(255,255,255,0.7)" tickFormatter={formatCurrency} fontSize={isTvMode ? 14 : 12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
                formatter={(value: number, name: string) => [
                  formatCurrency(value),
                  name === "sales" ? "Vendas" : "Meta",
                ]}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
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

      {/* Performance por Canal */}
      <Card className="backdrop-blur-md bg-white/10 border-white/20">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-2xl" : "text-lg"}`}>
            Performance por Canal de Marketing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={isTvMode ? 400 : 300}>
            <BarChart data={marketingData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                type="number"
                stroke="rgba(255,255,255,0.7)"
                tickFormatter={formatNumber}
                fontSize={isTvMode ? 14 : 12}
              />
              <YAxis
                type="category"
                dataKey="channel"
                stroke="rgba(255,255,255,0.7)"
                fontSize={isTvMode ? 14 : 12}
                width={isTvMode ? 100 : 80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "white",
                }}
                formatter={(value: number) => [formatNumber(value), "Leads"]}
              />
              <Bar dataKey="leads" fill="url(#colorGradient)" radius={[0, 4, 4, 0]} />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
