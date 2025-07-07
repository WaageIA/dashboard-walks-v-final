import type {
  TPVDashboardData,
  TPVMetrics,
  TPVClient,
  TPVHourlyData,
  TPVAlert,
  TPVGeographicData,
  TPVMonthlyComparison,
  TPVDailyData,
  TPVCategoryData,
  TPVPerformanceMetrics,
} from "@/types/tpv"

export function generateTPVData(): TPVDashboardData {
  // Gerar métricas principais
  const metrics: TPVMetrics = {
    tpvToday: {
      value: Math.floor(Math.random() * 100000) + 800000, // 800K - 900K
      trend: Math.floor(Math.random() * 20) + 5, // 5% - 25%
    },
    tpvMonth: {
      value: Math.floor(Math.random() * 2000000) + 12000000, // 12M - 14M
      trend: Math.floor(Math.random() * 15) + 15, // 15% - 30%
      target: 15200000,
    },
    targetPercentage: {
      value: Math.floor(Math.random() * 15) + 80, // 80% - 95%
      target: 100,
    },
    realTimeTransactions: {
      value: Math.floor(Math.random() * 50) + 100, // 100 - 150 por minuto
      trend: Math.floor(Math.random() * 30) + 10, // 10% - 40%
    },
    terminalsOnline: {
      value: Math.floor(Math.random() * 50) + 920, // 920 - 970
      total: 1000,
    },
    approvalRate: {
      value: Math.floor(Math.random() * 30) + 970, // 97.0% - 99.9%
      trend: Math.floor(Math.random() * 20) - 10, // -10% a +10%
    },
    responseTime: {
      value: Math.floor(Math.random() * 8) + 10, // 1.0s - 1.8s
      trend: Math.floor(Math.random() * 20) - 15, // -15% a +5%
    },
    clients: {
      value: Math.floor(Math.random() * 1000) + 8500, // 8500 - 9500
      todayIncrease: Math.floor(Math.random() * 200) + 50, // 50 - 250
    },
  }

  // Gerar top clientes
  const clientCategories = [
    { name: "Varejo", icon: "🏪" },
    { name: "Combustível", icon: "⛽" },
    { name: "Restaurante", icon: "🍽️" },
    { name: "Farmácia", icon: "💊" },
    { name: "Shopping", icon: "🛍️" },
    { name: "Fast Food", icon: "🍔" },
    { name: "Saúde", icon: "🏥" },
    { name: "Autopeças", icon: "🔧" },
  ]

  const clientNames = [
    "Supermercado Atacadão",
    "Posto Shell Oeste",
    "Fogo de Chão",
    "Farmácia Araujo",
    "Shopping Flamboyant",
    "Madero Burger",
    "Lojas Americanas",
    "Clínica Cedimagem",
    "Auto Peças Goiânia",
    "Restaurante Mangai",
  ]

  const topClients: TPVClient[] = clientNames.slice(0, 10).map((name, index) => {
    const category = clientCategories[index % clientCategories.length]
    return {
      rank: index + 1,
      name,
      category: category.name,
      categoryIcon: category.icon,
      value: Math.floor(Math.random() * 800000) + 200000, // 200K - 1M
      trend: Math.floor(Math.random() * 40) - 10, // -10% a +30%
    }
  })

  // Gerar dados por hora (últimas 8 horas)
  const hourlyData: TPVHourlyData[] = Array.from({ length: 8 }, (_, i) => {
    const hour = new Date()
    hour.setHours(hour.getHours() - (7 - i))

    return {
      hour: hour.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      value: Math.floor(Math.random() * 50000) + 80000, // 80K - 130K por hora
    }
  })

  // Gerar alertas críticos
  const alertTypes = [
    {
      type: "error" as const,
      titles: ["Cliente sem movimentação", "Terminal offline", "Falha de comunicação"],
      icons: ["❌", "📱", "📡"],
    },
    {
      type: "warning" as const,
      titles: ["Queda de performance", "Inatividade prolongada", "Limite de transações"],
      icons: ["⚠️", "⏰", "📊"],
    },
    {
      type: "info" as const,
      titles: ["Novo cliente ativo", "Atualização disponível", "Manutenção programada"],
      icons: ["ℹ️", "🔄", "🔧"],
    },
  ]

  const alerts: TPVAlert[] = Array.from({ length: 5 }, (_, i) => {
    const alertType = alertTypes[Math.floor(Math.random() * alertTypes.length)]
    const titleIndex = Math.floor(Math.random() * alertType.titles.length)
    const time = new Date()
    time.setMinutes(time.getMinutes() - Math.floor(Math.random() * 60))

    return {
      id: `alert-${i}`,
      type: alertType.type,
      title: alertType.titles[titleIndex],
      description: getAlertDescription(alertType.titles[titleIndex]),
      time: time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      icon: alertType.icons[titleIndex],
    }
  })

  // Gerar dados geográficos - Estados do Brasil
  const geographic: TPVGeographicData[] = [
    {
      region: "São Paulo",
      value: Math.floor(Math.random() * 2000000) + 8000000, // 8M - 10M
      percentage: Math.floor(Math.random() * 40) - 10, // -10% a +30%
    },
    {
      region: "Rio de Janeiro",
      value: Math.floor(Math.random() * 1500000) + 4000000, // 4M - 5.5M
      percentage: Math.floor(Math.random() * 35) - 5, // -5% a +30%
    },
    {
      region: "Minas Gerais",
      value: Math.floor(Math.random() * 1200000) + 3000000, // 3M - 4.2M
      percentage: Math.floor(Math.random() * 30) - 8, // -8% a +22%
    },
    {
      region: "Paraná",
      value: Math.floor(Math.random() * 800000) + 2200000, // 2.2M - 3M
      percentage: Math.floor(Math.random() * 25) - 5, // -5% a +20%
    },
    {
      region: "Rio Grande do Sul",
      value: Math.floor(Math.random() * 700000) + 1800000, // 1.8M - 2.5M
      percentage: Math.floor(Math.random() * 28) - 12, // -12% a +16%
    },
    {
      region: "Santa Catarina",
      value: Math.floor(Math.random() * 600000) + 1500000, // 1.5M - 2.1M
      percentage: Math.floor(Math.random() * 32) - 3, // -3% a +29%
    },
    {
      region: "Bahia",
      value: Math.floor(Math.random() * 500000) + 1200000, // 1.2M - 1.7M
      percentage: Math.floor(Math.random() * 20) - 15, // -15% a +5%
    },
    {
      region: "Goiás",
      value: Math.floor(Math.random() * 400000) + 1000000, // 1M - 1.4M
      percentage: Math.floor(Math.random() * 35) + 5, // +5% a +40%
    },
    {
      region: "Pernambuco",
      value: Math.floor(Math.random() * 300000) + 800000, // 800K - 1.1M
      percentage: Math.floor(Math.random() * 25) - 8, // -8% a +17%
    },
    {
      region: "Ceará",
      value: Math.floor(Math.random() * 250000) + 600000, // 600K - 850K
      percentage: Math.floor(Math.random() * 30) - 5, // -5% a +25%
    },
  ].sort((a, b) => b.value - a.value) // Ordenar por valor decrescente

  // Novos dados para Tela02

  // Comparativo mensal
  const currentMonthValue = metrics.tpvMonth.value
  const previousMonthValue = Math.floor(Math.random() * 2000000) + 10000000 // 10M - 12M
  const monthlyComparison: TPVMonthlyComparison = {
    currentMonth: {
      value: currentMonthValue,
      target: metrics.tpvMonth.target,
      achievement: (currentMonthValue / metrics.tpvMonth.target) * 100,
    },
    previousMonth: {
      value: previousMonthValue,
      target: 14000000, // Meta do mês anterior
      achievement: (previousMonthValue / 14000000) * 100,
    },
    growth: ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100,
  }

  // Dados diários (últimos 30 dias)
  const dailyData: TPVDailyData[] = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    const dailyTarget = metrics.tpvMonth.target / 30 // Meta diária

    return {
      day: date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
      value: Math.floor(Math.random() * 200000) + 300000, // 300K - 500K por dia
      target: dailyTarget,
    }
  })

  // Dados por categoria
  const categoryData: TPVCategoryData[] = [
    {
      category: "Varejo",
      value: Math.floor(Math.random() * 3000000) + 4000000, // 4M - 7M
      percentage: 35,
      trend: Math.floor(Math.random() * 20) + 5, // +5% a +25%
      icon: "🏪",
    },
    {
      category: "Combustível",
      value: Math.floor(Math.random() * 2000000) + 2500000, // 2.5M - 4.5M
      percentage: 22,
      trend: Math.floor(Math.random() * 15) - 5, // -5% a +10%
      icon: "⛽",
    },
    {
      category: "Alimentação",
      value: Math.floor(Math.random() * 1500000) + 2000000, // 2M - 3.5M
      percentage: 18,
      trend: Math.floor(Math.random() * 25) + 10, // +10% a +35%
      icon: "🍽️",
    },
    {
      category: "Farmácia",
      value: Math.floor(Math.random() * 1000000) + 1200000, // 1.2M - 2.2M
      percentage: 12,
      trend: Math.floor(Math.random() * 18) + 2, // +2% a +20%
      icon: "💊",
    },
    {
      category: "Serviços",
      value: Math.floor(Math.random() * 800000) + 800000, // 800K - 1.6M
      percentage: 8,
      trend: Math.floor(Math.random() * 30) - 10, // -10% a +20%
      icon: "🔧",
    },
    {
      category: "Outros",
      value: Math.floor(Math.random() * 500000) + 500000, // 500K - 1M
      percentage: 5,
      trend: Math.floor(Math.random() * 20) - 5, // -5% a +15%
      icon: "📦",
    },
  ]

  // Métricas de performance
  const performance: TPVPerformanceMetrics = {
    efficiency: Math.floor(Math.random() * 15) + 85, // 85% - 100%
    availability: Math.floor(Math.random() * 10) + 90, // 90% - 100%
    satisfaction: Math.floor(Math.random() * 20) + 80, // 80% - 100%
    growth: Math.floor(Math.random() * 30) + 10, // 10% - 40%
  }

  return {
    metrics,
    topClients: topClients.sort((a, b) => b.value - a.value),
    hourlyData,
    alerts,
    geographic,
    lastUpdate: new Date(),
    monthlyComparison,
    dailyData,
    categoryData,
    performance,
  }
}

function getAlertDescription(title: string): string {
  const descriptions: Record<string, string> = {
    "Cliente sem movimentação": "Lojas Americanas - 35 dias",
    "Terminal offline": "Auto Peças - Terminal 03",
    "Falha de comunicação": "Rede instável - Setor Sul",
    "Queda de performance": "Farmácia Central - 15% menor",
    "Inatividade prolongada": "Clínica Vita - 43 dias",
    "Limite de transações": "Shopping Center - 95% do limite",
    "Novo cliente ativo": "Restaurante Novo - Ativado hoje",
    "Atualização disponível": "Sistema v2.1 - Disponível",
    "Manutenção programada": "Servidor - Domingo 02:00",
  }

  return descriptions[title] || "Detalhes não disponíveis"
}
