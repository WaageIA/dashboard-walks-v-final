"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, TrendingUp, Target, Award } from "lucide-react"
import type { DashboardData } from "@/types/dashboard"

interface OutroDepartamento1Props {
  data: DashboardData
  loading: boolean
  isTvMode: boolean
}

export default function OutroDepartamento1({ data, loading, isTvMode }: OutroDepartamento1Props) {
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>
            Departamento de Recursos Humanos
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
          Departamento de Recursos Humanos
        </h2>
        <p className={`text-gray-400 ${isTvMode ? "text-xl" : "text-base"}`}>
          Métricas de pessoas e desenvolvimento organizacional
        </p>
      </div>

      {/* Métricas de RH */}
      <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 ${isTvMode ? "gap-8" : ""}`}>
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Users className={`text-blue-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>127</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Colaboradores</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 font-semibold">+8%</span>
              <span className="text-gray-400 text-sm">vs ano anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Target className={`text-green-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>92%</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Satisfação</div>
              </div>
            </div>
            <Progress value={92} className="h-3 bg-gray-800" />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Award className={`text-yellow-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>3.2%</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Turnover</div>
              </div>
            </div>
            <div className="text-green-400 text-sm">Abaixo da meta (5%)</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className={`p-6 ${isTvMode ? "p-8" : ""}`}>
            <div className="flex items-center justify-between mb-4">
              <Users className={`text-purple-400 ${isTvMode ? "h-12 w-12" : "h-8 w-8"}`} />
              <div className="text-right">
                <div className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"}`}>15</div>
                <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>Novas Contratações</div>
              </div>
            </div>
            <div className="text-blue-400 text-sm">Este mês</div>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder para mais conteúdo */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className={`text-white ${isTvMode ? "text-3xl" : "text-xl"}`}>
            Desenvolvimento em Andamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className={`text-gray-400 ${isTvMode ? "text-xl" : "text-lg"}`}>
              🚧 Departamento em desenvolvimento
            </div>
            <p className={`text-gray-500 mt-2 ${isTvMode ? "text-lg" : "text-base"}`}>
              Métricas detalhadas de RH serão implementadas em breve
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
