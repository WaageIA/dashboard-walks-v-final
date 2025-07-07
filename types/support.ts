export interface SupportAgent {
  id: string
  name: string
  photo?: string
  position: number
  status: "Online" | "Ocupado" | "Sobrecarregado" | "Pausa"
  stats: {
    emAtendimento: number
    resolvidos: number
    tmr: string
  }
}

export interface QueueItem {
  id: string
  cliente: string
  empresa: string
  produto: string
  icon: string
  aguardando: string
  prioridade: "Alta" | "Média" | "Baixa"
}

export interface Metric {
  title: string
  value: string | number
  icon: string
  color: string
  hasTarget?: boolean
  target?: string
  targetMet?: boolean
}

export interface SupportDashboardData {
  lastUpdate: Date
  generalMetrics: Metric[]
  performanceMetrics: Metric[]
  agents: SupportAgent[]
  queue: QueueItem[]
}
