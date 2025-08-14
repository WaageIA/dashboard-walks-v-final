/**
 * Dados estáveis que não causam problemas de hidratação
 * Estes dados são consistentes entre servidor e cliente
 */

// Dados base estáveis para TPV
export const stableTPVData = {
  tpvToday: { value: 850000, trend: 15 },
  tpvMonth: { value: 13500000, trend: 22, target: 15200000 },
  targetPercentage: { value: 88, target: 100 },
  realTimeTransactions: { value: 125, trend: 18 },
  terminalsOnline: { value: 945, total: 1000 },
  approvalRate: { value: 985, trend: 2 },
  responseTime: { value: 14, trend: -8 },
  clients: { value: 9200, todayIncrease: 150 },
}

// Dados base estáveis para vendas
export const stableSalesData = [
  { day: "01/12", sales: 15000, target: 16600 },
  { day: "02/12", sales: 18500, target: 16600 },
  { day: "03/12", sales: 16200, target: 16600 },
  { day: "04/12", sales: 19800, target: 16600 },
  { day: "05/12", sales: 17500, target: 16600 },
  { day: "06/12", sales: 20200, target: 16600 },
  { day: "07/12", sales: 16800, target: 16600 },
]

// Função para adicionar variação controlada aos dados base
export const addVariation = (baseValue: number, variationPercent: number = 10): number => {
  const variation = baseValue * (variationPercent / 100)
  const seed = Math.floor(Date.now() / (1000 * 60 * 5)) // Muda a cada 5 minutos
  const random = Math.sin(seed) * 10000
  const normalizedRandom = (random - Math.floor(random)) * 2 - 1 // -1 a 1
  return Math.floor(baseValue + (variation * normalizedRandom))
}

// Função para gerar dados com base estável mas com pequenas variações
export const generateStableVariation = (baseData: any, isClient: boolean = false) => {
  if (!isClient) {
    // No servidor, sempre retorna dados base
    return baseData
  }
  
  // No cliente, pode adicionar pequenas variações
  return baseData
}