"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  Ticket,
  CheckSquare,
  Users,
  Clock,
  Target,
  Star,
  ShieldCheck,
  Store,
  CreditCard,
  Smartphone,
  Monitor,
  Truck,
  Headphones,
  RefreshCw,
} from "lucide-react"
import { getAllSupportData } from "@/lib/supportService"
import { transformSupportData } from "@/lib/supportDataProcessor"
import type { SupportDashboardData } from "@/types/support"

interface SuporteDashboardProps {
  data?: any
  loading?: boolean
  isTvMode?: boolean
}

// Mapeamento de ícones (sem alteração)
const iconMap = {
  "check-circle": CheckCircle,
  ticket: Ticket,
  "check-square": CheckSquare,
  users: Users,
  clock: Clock,
  target: Target,
  star: Star,
  "shield-check": ShieldCheck,
  store: Store,
  "credit-card": CreditCard,
  smartphone: Smartphone,
  monitor: Monitor,
  truck: Truck,
}

// Cores de status (sem alteração)
const statusColors = {
  Online: "bg-green-500",
  Ocupado: "bg-yellow-500",
  Sobrecarregado: "bg-red-500",
  Pausa: "bg-gray-500",
}

// Cores de prioridade (sem alteração)
const priorityColors = {
  Alta: "bg-red-500 text-white",
  Média: "bg-yellow-500 text-white",
  Baixa: "bg-green-500 text-white",
}

// A função transformData foi movida para lib/supportDataProcessor.ts


export default function SuporteDashboard({ data: webhookData, isTvMode = false }: SuporteDashboardProps) {
  const [supportData, setSupportData] = useState<SupportDashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const fetchDataFromDB = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      // Busca todos os dados em paralelo
      const { tickets, agents, queue } = await getAllSupportData();
      
      // Transforma os dados usando a função do processador
      const transformed = transformSupportData(tickets, agents, queue);
      
      setSupportData(transformed);
      setLastUpdate(new Date());
    } catch (err) {
      setError("Falha ao buscar os dados do banco de dados.");
      console.error(err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (webhookData?.supportData) {
      // Lógica para tratar dados do webhook (mantida)
      // A transformação de dados do webhook deve ser feita aqui se o formato for diferente
      console.log("Recebido dados do Webhook:", webhookData.supportData);
      // setSupportData(transformWebhookData(webhookData.supportData)); // Exemplo
      setLoading(false);
    } else {
      fetchDataFromDB();
    }
  }, [webhookData, fetchDataFromDB]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Carregando Dashboard de Suporte...</p>
        </div>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center bg-red-900/20 p-8 rounded-lg">
           <p className="text-red-400 text-lg">{error}</p>
           <button onClick={fetchDataFromDB} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Tentar Novamente</button>
        </div>
      </div>
    )
  }

  if (!supportData) {
     return <div>Sem dados para exibir.</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Headphones className={`${isTvMode ? "h-8 w-8" : "h-6 w-6"} text-white`} />
          </div>
          <div>
            <h1 className={`font-bold text-white ${isTvMode ? "text-4xl" : "text-2xl"}`}>Dashboard Suporte</h1>
            <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"}`}>
              {webhookData?.supportData ? "Dados em Tempo Real" : "Dados via Banco de Dados"}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"} flex items-center`}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Atualizado: {lastUpdate.toLocaleTimeString("pt-BR")}</span>
          </div>
        </div>
      </div>

      {/* Métricas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportData.generalMetrics.map((metric, index) => {
          const Icon = iconMap[metric.icon as keyof typeof iconMap]
          return (
            <Card key={index} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className={`${isTvMode ? "p-8" : "p-6"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"} font-medium`}>{metric.title}</p>
                    <p className={`font-bold text-white ${isTvMode ? "text-3xl" : "text-2xl"} mt-1`}>{metric.value}</p>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      metric.color === "green"
                        ? "bg-green-500/20 text-green-400"
                        : metric.color === "yellow"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : metric.color === "purple"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {Icon && <Icon className={`${isTvMode ? "h-8 w-8" : "h-6 w-6"}`} />}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Métricas de Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {supportData.performanceMetrics.map((metric, index) => {
          const Icon = iconMap[metric.icon as keyof typeof iconMap]
          return (
            <Card key={index} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
              <CardContent className={`${isTvMode ? "p-8" : "p-6"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg ${
                      metric.color === "green" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {Icon && <Icon className={`${isTvMode ? "h-6 w-6" : "h-5 w-5"}`} />}
                  </div>
                </div>
                <div>
                  <p className={`text-gray-400 ${isTvMode ? "text-lg" : "text-sm"} font-medium mb-1`}>{metric.title}</p>
                  <p
                    className={`font-bold ${isTvMode ? "text-3xl" : "text-2xl"} ${
                      metric.targetMet ? "text-green-400" : "text-white"
                    }`}
                  >
                    {metric.value}
                  </p>
                  {metric.hasTarget && (
                    <div className="flex items-center mt-2">
                      <span className={`text-xs ${isTvMode ? "text-sm" : ""} text-gray-500`}>
                        Meta: {metric.target}
                      </span>
                      {metric.targetMet ? <CheckCircle className="h-4 w-4 text-green-400 ml-2" /> : <Clock className="h-4 w-4 text-yellow-400 ml-2" />}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Performance dos Atendentes e Fila de Espera */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance dos Atendentes */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className={`text-white flex items-center ${isTvMode ? "text-2xl" : "text-lg"}`}>
              <Users className={`${isTvMode ? "h-7 w-7" : "h-5 w-5"} mr-2`} />
              Performance dos Atendentes
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isTvMode ? "p-8" : "p-6"} pt-0`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportData.agents.map((agent) => (
                <div key={agent.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className={`${isTvMode ? "h-12 w-12" : "h-10 w-10"}`}>
                          <AvatarImage src={agent.photo || "/placeholder.svg"} alt={agent.name} />
                          <AvatarFallback className="bg-gray-700 text-white">
                            {agent.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${statusColors[agent.status as keyof typeof statusColors]}`}
                        ></div>
                      </div>
                      <div>
                        <p className={`font-medium text-white ${isTvMode ? "text-lg" : "text-sm"}`}>{agent.name}</p>
                        <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>{agent.position}º Lugar</p>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className={`${
                        agent.status === "Online"
                          ? "bg-green-500/20 text-green-400"
                          : agent.status === "Ocupado"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : agent.status === "Sobrecarregado"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-gray-500/20 text-gray-400"
                      } ${isTvMode ? "text-sm px-3 py-1" : "text-xs"}`}
                    >
                      {agent.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
                        {agent.stats.emAtendimento}
                      </p>
                      <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>Em Atend.</p>
                    </div>
                    <div>
                      <p className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>
                        {agent.stats.resolvidos}
                      </p>
                      <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>Resolvidos</p>
                    </div>
                    <div>
                      <p className={`font-bold text-white ${isTvMode ? "text-xl" : "text-lg"}`}>{agent.stats.tmr}</p>
                      <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>TMR</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fila de Espera */}
        <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className={`text-white flex items-center ${isTvMode ? "text-2xl" : "text-lg"}`}>
              <Clock className={`${isTvMode ? "h-7 w-7" : "h-5 w-5"} mr-2`} />
              Fila de Espera (Tempo Real)
            </CardTitle>
          </CardHeader>
          <CardContent className={`${isTvMode ? "p-8" : "p-6"} pt-0`}>
            <div className="space-y-3">
              {/* Header da tabela */}
              <div className="grid grid-cols-4 gap-4 pb-2 border-b border-gray-700">
                <p className={`text-gray-400 font-medium ${isTvMode ? "text-lg" : "text-sm"}`}>Cliente</p>
                <p className={`text-gray-400 font-medium ${isTvMode ? "text-lg" : "text-sm"}`}>Produto</p>
                <p className={`text-gray-400 font-medium ${isTvMode ? "text-lg" : "text-sm"}`}>Aguardando</p>
                <p className={`text-gray-400 font-medium ${isTvMode ? "text-lg" : "text-sm"}`}>Prioridade</p>
              </div>

              {/* Itens da fila */}
              {supportData.queue.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-4 gap-4 py-3 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <div>
                      <p className={`text-white font-medium ${isTvMode ? "text-lg" : "text-sm"}`}>{item.cliente}</p>
                      <p className={`text-gray-400 ${isTvMode ? "text-sm" : "text-xs"}`}>{item.empresa}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className={`${isTvMode ? "h-5 w-5" : "h-4 w-4"} text-gray-400`} />}
                      <span className={`text-white ${isTvMode ? "text-lg" : "text-sm"}`}>{item.produto}</span>
                    </div>
                    <div>
                      <span className={`text-white font-medium ${isTvMode ? "text-lg" : "text-sm"}`}>
                        {item.aguardando}
                      </span>
                    </div>
                    <div>
                      <Badge
                        className={`${priorityColors[item.prioridade as keyof typeof priorityColors]} ${isTvMode ? "text-sm px-3 py-1" : "text-xs"}`}
                      >
                        {item.prioridade}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}