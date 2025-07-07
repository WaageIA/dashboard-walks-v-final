export interface TPVMetrics {
  tpvToday: {
    value: number
    trend: number
  }
  tpvMonth: {
    value: number
    trend: number
    target: number
  }
  targetPercentage: {
    value: number
    target: number
  }
  realTimeTransactions: {
    value: number
    trend: number
  }
  terminalsOnline: {
    value: number
    total: number
  }
  approvalRate: {
    value: number
    trend: number
  }
  responseTime: {
    value: number
    trend: number
  }
  clients: {
    value: number
    todayIncrease: number
  }
}

export interface TPVClient {
  rank: number
  name: string
  category: string
  categoryIcon: string
  value: number
  trend: number
}

export interface TPVHourlyData {
  hour: string
  value: number
}

export interface TPVAlert {
  id: string
  type: "error" | "warning" | "info"
  title: string
  description: string
  time: string
  icon: string
}

export interface TPVGeographicData {
  region: string
  value: number
  percentage: number // Agora representa variação percentual, não participação
}

// Novas interfaces para TPV Tela02
export interface TPVMonthlyComparison {
  currentMonth: {
    value: number
    target: number
    achievement: number
  }
  previousMonth: {
    value: number
    target: number
    achievement: number
  }
  growth: number
}

export interface TPVDailyData {
  day: string
  value: number
  target: number
}

export interface TPVCategoryData {
  category: string
  value: number
  percentage: number
  trend: number
  icon: string
}

export interface TPVPerformanceMetrics {
  efficiency: number
  availability: number
  satisfaction: number
  growth: number
}

export interface TPVDashboardData {
  metrics: TPVMetrics
  topClients: TPVClient[]
  hourlyData: TPVHourlyData[]
  alerts: TPVAlert[]
  geographic: TPVGeographicData[]
  lastUpdate: Date
  // Novos dados para Tela02
  monthlyComparison: TPVMonthlyComparison
  dailyData: TPVDailyData[]
  categoryData: TPVCategoryData[]
  performance: TPVPerformanceMetrics
}
