"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Package, TrendingUp, Truck, BarChart3 } from "lucide-react"
import type { DashboardData } from "@/types/dashboard"

interface OutroDepartamento4Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function OutroDepartamento4({ data, loading, isTvMode }: OutroDepartamento4Props) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>Departamento de Logística</h2>
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
          Departamento de Logística e Operações
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Controle de estoque, entregas e operações
        </p>
      </div>

      {/* Métricas de Logística */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Package className={`text-blue-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>2.847</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Itens em Estoque</div>
              </div>
            </div>
            <Progress value={78} className="h-3 bg-gray-800" />
            <div className="text-yellow-400 text-sm mt-2">78% da capacidade</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Truck className={`text-green-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>96.5%</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Entregas no Prazo</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+2.1%</span>
              <span className="text-gray-400 text-sm">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className={`text-purple-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>1.2</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Giro de Estoque</div>
              </div>
            </div>
            <div className="text-green-400 text-sm">Dentro da meta</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Package className={`text-yellow-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>342</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Pedidos Pendentes</div>
              </div>
            </div>
            <div className="text-blue-400 text-sm">Processamento hoje</div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder para mais conteúdo */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>Operações e Distribuição</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className={`text-gray-400 ${isTvMode ? "text-xl" : "text-lg"}`}>
              🚚 Sistema de rastreamento em desenvolvimento
            </div>
            <p className={`text-gray-500 mt-2 ${isTvMode ? "text-lg" : "text-base"}`}>
              Mapas de entrega e análises de rota serão implementados
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
