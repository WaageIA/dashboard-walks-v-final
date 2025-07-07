"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Calculator, PieChart } from "lucide-react"
import type { DashboardData } from "@/types/dashboard"

interface OutroDepartamento2Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function OutroDepartamento2({ data, loading, isTvMode }: OutroDepartamento2Props) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>Departamento Financeiro</h2>
        </div>
        <div className="animate-pulse">
          <div className="h-96 bg-gray-800 rounded"></div>
        </div>
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

  return (
    <div className="space-y-8">
      {/* Título da Tela */}
      <div className="text-center">
        <h2 className={`font-bold text-white ${isTvMode ? "text-4xl mb-4" : "text-2xl mb-2"}`}>
          Departamento Financeiro
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Controle financeiro e indicadores econômicos
        </p>
      </div>

      {/* Métricas Financeiras */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <DollarSign className={`text-green-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
                  {formatCurrency(2850000)}
                </div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Receita Mensal</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+15%</span>
              <span className="text-gray-400 text-sm">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Calculator className={`text-blue-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
                  {formatCurrency(1920000)}
                </div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Custos Operacionais</div>
              </div>
            </div>
            <Progress value={67} className="h-3 bg-gray-800" />
            <div className="text-yellow-400 text-sm mt-2">67% da receita</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <PieChart className={`text-purple-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
                  {formatCurrency(930000)}
                </div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Lucro Líquido</div>
              </div>
            </div>
            <div className="text-green-400 text-sm">Margem: 32.6%</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <DollarSign className={`text-yellow-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>
                  {formatCurrency(5200000)}
                </div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Caixa Disponível</div>
              </div>
            </div>
            <div className="text-blue-400 text-sm">6 meses de operação</div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder para mais conteúdo */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>
            Análises Financeiras Detalhadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className={`text-gray-400 ${isTvMode ? "text-xl" : "text-lg"}`}>
              📊 Relatórios financeiros em desenvolvimento
            </div>
            <p className={`text-gray-500 mt-2 ${isTvMode ? "text-lg" : "text-base"}`}>
              Gráficos de fluxo de caixa e análises de rentabilidade serão adicionados
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
