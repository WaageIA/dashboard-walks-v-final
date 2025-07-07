import type { DashboardData } from "@/types/dashboard"

const WEBHOOK_BASE_URL = "https://webhook.escalasdigitaischatboot.uk/webhook"

// Configuração dos endpoints para cada tipo de dado
const WEBHOOK_ENDPOINTS = {
  vendas: `${WEBHOOK_BASE_URL}/vendas`,
  marketing: `${WEBHOOK_BASE_URL}/marketing`,
  equipes: `${WEBHOOK_BASE_URL}/equipes`,
  campanhas: `${WEBHOOK_BASE_URL}/campanhas`,
  redes_sociais: `${WEBHOOK_BASE_URL}/redes-sociais`,
  funil: `${WEBHOOK_BASE_URL}/funil`,
  // Novos endpoints para ComercialTela01 e ComercialTela02
  metricas_periodicas: `${WEBHOOK_BASE_URL}/metricas-periodicas`,
  vendas_produtos: `${WEBHOOK_BASE_URL}/vendas-produtos`,
  atividades_comerciais: `${WEBHOOK_BASE_URL}/atividades-comerciais`,
  funil_detalhado: `${WEBHOOK_BASE_URL}/funil-detalhado`,
  // Novo endpoint para Suporte
  suporte: `${WEBHOOK_BASE_URL}/suporte`,
  // Novos endpoints para Ranking de Vendas
  ranking_vendas: `${WEBHOOK_BASE_URL}/ranking-vendas`,
  ranking_vendas_periodo: `${WEBHOOK_BASE_URL}/ranking-vendas-periodo`,
} as const

// Interface para os dados que você deve enviar via webhook
export interface WebhookVendasData {
  vendas_mes: number
  meta_vendas: number
  vendas_diarias: Array<{
    data: string // formato: "DD/MM"
    vendas: number
    meta: number
  }>
  equipe_comercial: Array<{
    nome: string
    vendas: number
    meta: number
    atividades: {
      ligacoes: number
      reunioes: number
      propostas: number
    }
  }>
}

export interface WebhookMarketingData {
  leads_gerados: number
  meta_leads: number
  custo_por_lead: number
  taxa_conversao: number
  canais: Array<{
    nome: string
    leads: number
    investimento: number
  }>
  campanhas: Array<{
    nome: string
    investimento: number
    conversoes: number
    roi: number
    status: "ativa" | "pausada" | "finalizada"
  }>
}

export interface WebhookRedesSociaisData {
  plataformas: Array<{
    nome: string
    seguidores: number
    engajamento: number
    alcance: number
    crescimento_mensal: number
  }>
}

export interface WebhookFunilData {
  etapas: Array<{
    nome: string
    quantidade: number
    taxa_conversao?: number
  }>
}

// Novas interfaces para ComercialTela01
export interface WebhookMetricasPeriodicasData {
  semanal: {
    vendas_totais: number
    meta_vendas: number
    tendencia_vendas: number
    leads_qualificados: number
    meta_leads: number
    tendencia_leads: number
    taxa_conversao: number
    meta_conversao: number
    tendencia_conversao: number
    meta_periodo: {
      atual: number
      total: number
    }
  }
  mensal: {
    vendas_totais: number
    meta_vendas: number
    tendencia_vendas: number
    leads_qualificados: number
    meta_leads: number
    tendencia_leads: number
    taxa_conversao: number
    meta_conversao: number
    tendencia_conversao: number
    meta_periodo: {
      atual: number
      total: number
    }
  }
  anual: {
    vendas_totais: number
    meta_vendas: number
    tendencia_vendas: number
    leads_qualificados: number
    meta_leads: number
    tendencia_leads: number
    taxa_conversao: number
    meta_conversao: number
    tendencia_conversao: number
    meta_periodo: {
      atual: number
      total: number
    }
  }
}

// Novas interfaces para ComercialTela02
export interface WebhookVendasProdutosData {
  produtos: Array<{
    nome: string
    vendas: number
    meta: number
    categoria: string
  }>
}

export interface WebhookAtividadesComerciais {
  atividades: Array<{
    tipo: string
    realizadas: number
    meta: number
    responsavel?: string
  }>
}

export interface WebhookFunilDetalhadoData {
  etapas: Array<{
    nome: string
    quantidade: number
    taxa_conversao?: number
    valor_total: number
    tempo_medio_dias: number
    oportunidades_perdidas: number
  }>
}

// Nova interface para Suporte
export interface WebhookSuporteData {
  generalMetrics: {
    status: "online" | "offline" | "maintenance"
    totalTickets: number
    openTickets: number
    closedTickets: number
    activeAgents: number
    totalAgents: number
  }
  performanceMetrics: Array<{
    name: string
    value: number
    target: number
    unit: string
    trend: number
  }>
  agents: Array<{
    name: string
    status: "online" | "offline" | "busy" | "away"
    ticketsHandled: number
    avgResponseTime: number
    satisfaction: number
  }>
  queue: Array<{
    customer: string
    subject: string
    priority: "low" | "medium" | "high" | "urgent"
    waitTime: number
    category: string
  }>
}

// Novas interfaces para Ranking de Vendas
export interface WebhookRankingVendasData {
  vendedores: Array<{
    id: string
    nome: string
    foto?: string
    vendas: number
    meta: number
    percentual: number
    status: "Superou" | "Próximo" | "Abaixo"
    posicao: number
    atividades: {
      ligacoes: number
      reunioes: number
      propostas: number
      emails: number
    }
    historico_mensal: Array<{
      mes: string
      vendas: number
      meta: number
    }>
  }>
  metas_gerais: {
    meta_total_equipe: number
    vendas_total_equipe: number
    percentual_equipe: number
    vendedores_acima_meta: number
    vendedores_proximo_meta: number
    vendedores_abaixo_meta: number
  }
  periodo_competicao: {
    inicio: string
    fim: string
    mes_referencia: string
  }
}

// Interface para Ranking de Vendas 02 (Performance por Período)
export interface WebhookRankingVendas02Data {
  vendedores: Array<{
    id: string
    nome: string
    foto?: string
    vendas_mes: number
    meta_mes: number
    percentual_mes: number
    status: "Superou" | "Próximo" | "Abaixo"
    posicao: number
    performance_periodo: {
      hoje: {
        vendas: number
        meta_diaria: number
        atividades: number
      }
      semana: {
        vendas: number
        meta_semanal: number
        dias_trabalhados: number
      }
      mes: {
        vendas: number
        meta_mensal: number
        dias_trabalhados: number
        dias_restantes: number
      }
    }
    tendencias: {
      vendas_diarias: number // % de crescimento
      vendas_semanais: number // % de crescimento
      vendas_mensais: number // % de crescimento
    }
  }>
  metricas_periodo: {
    total_vendas_hoje: number
    total_vendas_semana: number
    total_vendas_mes: number
    meta_total_mes: number
    dias_uteis_mes: number
    dias_trabalhados: number
    dias_restantes: number
    media_diaria_necessaria: number
  }
  comparativo_periodo: {
    mes_anterior: {
      vendas: number
      percentual_crescimento: number
    }
    mesmo_periodo_ano_anterior: {
      vendas: number
      percentual_crescimento: number
    }
  }
}

// Função principal para buscar todos os dados
export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    console.log("🔄 Buscando dados dos webhooks...")

    // Buscar dados em paralelo para melhor performance
    const [
      vendasData,
      marketingData,
      redesSociaisData,
      funilData,
      metricasPeriodicasData,
      vendasProdutosData,
      atividadesData,
      funilDetalhadoData,
      suporteData,
      rankingVendasData,
      rankingVendas02Data,
    ] = await Promise.allSettled([
      fetchVendasData(),
      fetchMarketingData(),
      fetchRedesSociaisData(),
      fetchFunilData(),
      fetchMetricasPeriodicasData(),
      fetchVendasProdutosData(),
      fetchAtividadesComerciais(),
      fetchFunilDetalhadoData(),
      fetchSuporteData(),
      fetchRankingVendasData(),
      fetchRankingVendas02Data(),
    ])

    // Processar resultados e usar fallback em caso de erro
    const vendas = vendasData.status === "fulfilled" ? vendasData.value : getVendasFallback()
    const marketing = marketingData.status === "fulfilled" ? marketingData.value : getMarketingFallback()
    const redesSociais = redesSociaisData.status === "fulfilled" ? redesSociaisData.value : getRedesSociaisFallback()
    const funil = funilData.status === "fulfilled" ? funilData.value : getFunilFallback()
    const metricasPeriodicas =
      metricasPeriodicasData.status === "fulfilled" ? metricasPeriodicasData.value : getMetricasPeriodicasFallback()
    const vendasProdutos =
      vendasProdutosData.status === "fulfilled" ? vendasProdutosData.value : getVendasProdutosFallback()
    const atividades = atividadesData.status === "fulfilled" ? atividadesData.value : getAtividadesFallback()
    const funilDetalhado =
      funilDetalhadoData.status === "fulfilled" ? funilDetalhadoData.value : getFunilDetalhadoFallback()
    const suporte = suporteData.status === "fulfilled" ? suporteData.value : getSuporteFallback()
    const rankingVendas =
      rankingVendasData.status === "fulfilled" ? rankingVendasData.value : getRankingVendasFallback()
    const rankingVendas02 =
      rankingVendas02Data.status === "fulfilled" ? rankingVendas02Data.value : getRankingVendas02Fallback()

    // Combinar todos os dados no formato esperado pelo dashboard
    const dashboardData: DashboardData = {
      metrics: [
        {
          title: "Vendas do Mês",
          value: formatCurrency(vendas.vendas_mes),
          target: formatCurrency(vendas.meta_vendas),
          percentage: Math.round((vendas.vendas_mes / vendas.meta_vendas) * 100),
          trend: calculateTrend(vendas.vendas_diarias),
          type: "sales",
        },
        {
          title: "Leads Gerados",
          value: marketing.leads_gerados.toString(),
          target: marketing.meta_leads.toString(),
          percentage: Math.round((marketing.leads_gerados / marketing.meta_leads) * 100),
          trend: 8,
          type: "leads",
        },
        {
          title: "Seguidores Sociais",
          value: formatNumber(redesSociais.reduce((sum, p) => sum + p.seguidores, 0)),
          trend: Math.round(redesSociais.reduce((sum, p) => sum + p.crescimento_mensal, 0) / redesSociais.length),
          type: "followers",
        },
        {
          title: "Conversão Geral",
          value: `${marketing.taxa_conversao}%`,
          trend: -2,
          type: "conversion",
        },
      ],
      salesData: vendas.vendas_diarias.map((dia) => ({
        day: dia.data,
        sales: dia.vendas,
        target: dia.meta,
      })),
      marketingData: marketing.canais.map((canal) => ({
        channel: canal.nome,
        leads: canal.leads,
        color: getChannelColor(canal.nome),
      })),
      salesTeam: vendas.equipe_comercial.map((membro) => ({
        name: membro.nome,
        sales: membro.vendas,
        percentage: Math.round((membro.vendas / membro.meta) * 100),
        status: getStatusFromPercentage((membro.vendas / membro.meta) * 100),
      })),
      salesFunnel: funil.map((etapa, index) => ({
        stage: etapa.nome,
        count: etapa.quantidade,
        conversionRate: etapa.taxa_conversao,
      })),
      socialMedia: redesSociais.map((plataforma) => ({
        platform: plataforma.nome,
        followers: plataforma.seguidores,
        engagement: plataforma.engajamento,
        reach: plataforma.alcance,
      })),
      campaigns: marketing.campanhas
        .filter((c) => c.status === "ativa")
        .map((campanha) => ({
          name: campanha.nome,
          spent: campanha.investimento,
          conversions: campanha.conversoes,
          roi: campanha.roi,
        })),
      productGoals: [], // Manter vazio por enquanto
      productivityData: [], // Manter vazio por enquanto

      // Novos dados para ComercialTela01
      commercialPeriodicMetrics: [
        {
          periodLabel: "Semanal",
          totalSales: {
            currentValue: metricasPeriodicas.semanal.vendas_totais,
            targetValue: metricasPeriodicas.semanal.meta_vendas,
            trendPercent: metricasPeriodicas.semanal.tendencia_vendas,
          },
          qualifiedLeads: {
            currentValue: metricasPeriodicas.semanal.leads_qualificados,
            targetValue: metricasPeriodicas.semanal.meta_leads,
            trendPercent: metricasPeriodicas.semanal.tendencia_leads,
          },
          conversionRate: {
            currentValue: metricasPeriodicas.semanal.taxa_conversao,
            targetValue: metricasPeriodicas.semanal.meta_conversao,
            trendPercent: metricasPeriodicas.semanal.tendencia_conversao,
          },
          periodGoal: {
            currentValue: metricasPeriodicas.semanal.meta_periodo.atual,
            targetValue: metricasPeriodicas.semanal.meta_periodo.total,
          },
        },
        {
          periodLabel: "Mensal",
          totalSales: {
            currentValue: metricasPeriodicas.mensal.vendas_totais,
            targetValue: metricasPeriodicas.mensal.meta_vendas,
            trendPercent: metricasPeriodicas.mensal.tendencia_vendas,
          },
          qualifiedLeads: {
            currentValue: metricasPeriodicas.mensal.leads_qualificados,
            targetValue: metricasPeriodicas.mensal.meta_leads,
            trendPercent: metricasPeriodicas.mensal.tendencia_leads,
          },
          conversionRate: {
            currentValue: metricasPeriodicas.mensal.taxa_conversao,
            targetValue: metricasPeriodicas.mensal.meta_conversao,
            trendPercent: metricasPeriodicas.mensal.tendencia_conversao,
          },
          periodGoal: {
            currentValue: metricasPeriodicas.mensal.meta_periodo.atual,
            targetValue: metricasPeriodicas.mensal.meta_periodo.total,
          },
        },
        {
          periodLabel: "Anual",
          totalSales: {
            currentValue: metricasPeriodicas.anual.vendas_totais,
            targetValue: metricasPeriodicas.anual.meta_vendas,
            trendPercent: metricasPeriodicas.anual.tendencia_vendas,
          },
          qualifiedLeads: {
            currentValue: metricasPeriodicas.anual.leads_qualificados,
            targetValue: metricasPeriodicas.anual.meta_leads,
            trendPercent: metricasPeriodicas.anual.tendencia_leads,
          },
          conversionRate: {
            currentValue: metricasPeriodicas.anual.taxa_conversao,
            targetValue: metricasPeriodicas.anual.meta_conversao,
            trendPercent: metricasPeriodicas.anual.tendencia_conversao,
          },
          periodGoal: {
            currentValue: metricasPeriodicas.anual.meta_periodo.atual,
            targetValue: metricasPeriodicas.anual.meta_periodo.total,
          },
        },
      ],

      // Novos dados para ComercialTela02
      productSales: vendasProdutos.produtos.map((produto) => ({
        produto: produto.nome,
        vendas: produto.vendas,
        meta: produto.meta,
        percentual: Math.round((produto.vendas / produto.meta) * 100),
        categoria: produto.categoria,
      })),

      salesActivities: atividades.atividades.map((atividade) => ({
        atividade: atividade.tipo,
        realizadas: atividade.realizadas,
        meta: atividade.meta,
        percentual: Math.round((atividade.realizadas / atividade.meta) * 100),
        responsavel: atividade.responsavel,
      })),

      detailedFunnel: funilDetalhado.etapas.map((etapa) => ({
        stage: etapa.nome,
        count: etapa.quantidade,
        conversionRate: etapa.taxa_conversao,
        value: etapa.valor_total,
        averageTime: etapa.tempo_medio_dias,
        lostOpportunities: etapa.oportunidades_perdidas,
      })),

      // Dados do Suporte
      supportData: {
        generalMetrics: suporte.generalMetrics,
        performanceMetrics: suporte.performanceMetrics,
        agents: suporte.agents,
        queue: suporte.queue,
      },

      // Novos dados para Ranking de Vendas
      rankingVendasData: rankingVendas,

      // Novos dados para Ranking de Vendas 02
      rankingVendas02Data: rankingVendas02,
    }

    console.log("✅ Dados carregados com sucesso!")
    return dashboardData
  } catch (error) {
    console.error("❌ Erro ao buscar dados dos webhooks:", error)
    return getFallbackData()
  }
}

// Funções para buscar dados específicos de cada endpoint
async function fetchVendasData(): Promise<WebhookVendasData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.vendas, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados de vendas: ${response.status}`)
  }

  return response.json()
}

async function fetchMarketingData(): Promise<WebhookMarketingData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.marketing, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados de marketing: ${response.status}`)
  }

  return response.json()
}

async function fetchRedesSociaisData(): Promise<WebhookRedesSociaisData["plataformas"]> {
  const response = await fetch(WEBHOOK_ENDPOINTS.redes_sociais, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados de redes sociais: ${response.status}`)
  }

  const data: WebhookRedesSociaisData = await response.json()
  return data.plataformas
}

async function fetchFunilData(): Promise<WebhookFunilData["etapas"]> {
  const response = await fetch(WEBHOOK_ENDPOINTS.funil, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados do funil: ${response.status}`)
  }

  const data: WebhookFunilData = await response.json()
  return data.etapas
}

// Novas funções para ComercialTela01
async function fetchMetricasPeriodicasData(): Promise<WebhookMetricasPeriodicasData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.metricas_periodicas, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar métricas periódicas: ${response.status}`)
  }

  return response.json()
}

// Novas funções para ComercialTela02
async function fetchVendasProdutosData(): Promise<WebhookVendasProdutosData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.vendas_produtos, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar vendas por produtos: ${response.status}`)
  }

  return response.json()
}

async function fetchAtividadesComerciais(): Promise<WebhookAtividadesComerciais> {
  const response = await fetch(WEBHOOK_ENDPOINTS.atividades_comerciais, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar atividades comerciais: ${response.status}`)
  }

  return response.json()
}

async function fetchFunilDetalhadoData(): Promise<WebhookFunilDetalhadoData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.funil_detalhado, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar funil detalhado: ${response.status}`)
  }

  return response.json()
}

// Nova função para Suporte
async function fetchSuporteData(): Promise<WebhookSuporteData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.suporte, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados de suporte: ${response.status}`)
  }

  return response.json()
}

// Novas funções para Ranking de Vendas
async function fetchRankingVendasData(): Promise<WebhookRankingVendasData> {
  const response = await fetch(WEBHOOK_ENDPOINTS.ranking_vendas, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados de ranking de vendas: ${response.status}`)
  }

  return response.json()
}

async function fetchRankingVendas02Data(): Promise<WebhookRankingVendas02Data> {
  const response = await fetch(WEBHOOK_ENDPOINTS.ranking_vendas_periodo, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados de ranking de vendas por período: ${response.status}`)
  }

  return response.json()
}

// Funções auxiliares
function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function formatNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`
  }
  return value.toString()
}

function calculateTrend(vendasDiarias: WebhookVendasData["vendas_diarias"]): number {
  if (vendasDiarias.length < 2) return 0

  const ultimaSemana = vendasDiarias.slice(-7)
  const semanaAnterior = vendasDiarias.slice(-14, -7)

  const mediaUltimaSemana = ultimaSemana.reduce((sum, dia) => sum + dia.vendas, 0) / ultimaSemana.length
  const mediaSemanaAnterior = semanaAnterior.reduce((sum, dia) => sum + dia.vendas, 0) / semanaAnterior.length

  return Math.round(((mediaUltimaSemana - mediaSemanaAnterior) / mediaSemanaAnterior) * 100)
}

function getChannelColor(channelName: string): string {
  const colors: Record<string, string> = {
    "Google Ads": "#4285f4",
    Instagram: "#e4405f",
    Facebook: "#1877f2",
    LinkedIn: "#0077b5",
    Email: "#10b981",
    YouTube: "#ff0000",
    TikTok: "#000000",
    WhatsApp: "#25d366",
  }
  return colors[channelName] || "#6b7280"
}

function getStatusFromPercentage(percentage: number): "Superou" | "Próximo" | "Abaixo" {
  if (percentage >= 100) return "Superou"
  if (percentage >= 80) return "Próximo"
  return "Abaixo"
}

// Dados de fallback em caso de erro na API
function getVendasFallback(): WebhookVendasData {
  return {
    vendas_mes: 450000,
    meta_vendas: 500000,
    vendas_diarias: Array.from({ length: 30 }, (_, i) => ({
      data: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      vendas: Math.floor(Math.random() * 10000) + 15000,
      meta: 16600,
    })),
    equipe_comercial: [
      { nome: "João Silva", vendas: 45000, meta: 40000, atividades: { ligacoes: 150, reunioes: 25, propostas: 12 } },
      { nome: "Pedro Costa", vendas: 42000, meta: 40000, atividades: { ligacoes: 140, reunioes: 22, propostas: 10 } },
      { nome: "Maria Santos", vendas: 38000, meta: 40000, atividades: { ligacoes: 130, reunioes: 20, propostas: 8 } },
      { nome: "Ana Oliveira", vendas: 35000, meta: 40000, atividades: { ligacoes: 120, reunioes: 18, propostas: 7 } },
      {
        nome: "Carlos Ferreira",
        vendas: 33000,
        meta: 40000,
        atividades: { ligacoes: 115, reunioes: 16, propostas: 6 },
      },
      { nome: "Lucia Mendes", vendas: 31000, meta: 40000, atividades: { ligacoes: 110, reunioes: 15, propostas: 5 } },
      { nome: "Roberto Lima", vendas: 29000, meta: 40000, atividades: { ligacoes: 105, reunioes: 14, propostas: 4 } },
      { nome: "Fernanda Rocha", vendas: 27000, meta: 40000, atividades: { ligacoes: 100, reunioes: 13, propostas: 3 } },
      { nome: "Ricardo Alves", vendas: 25000, meta: 40000, atividades: { ligacoes: 95, reunioes: 12, propostas: 2 } },
      { nome: "Juliana Campos", vendas: 23000, meta: 40000, atividades: { ligacoes: 90, reunioes: 11, propostas: 1 } },
    ],
  }
}

function getMarketingFallback(): WebhookMarketingData {
  return {
    leads_gerados: 1250,
    meta_leads: 1000,
    custo_por_lead: 45,
    taxa_conversao: 3.4,
    canais: [
      { nome: "Google Ads", leads: 450, investimento: 20250 },
      { nome: "Instagram", leads: 320, investimento: 14400 },
      { nome: "Facebook", leads: 280, investimento: 12600 },
      { nome: "LinkedIn", leads: 200, investimento: 9000 },
    ],
    campanhas: [
      { nome: "Promoção Black Friday", investimento: 2800, conversoes: 145, roi: 340, status: "ativa" },
      { nome: "Leads B2B LinkedIn", investimento: 1500, conversoes: 89, roi: 220, status: "ativa" },
      { nome: "Remarketing Google", investimento: 950, conversoes: 67, roi: 180, status: "ativa" },
    ],
  }
}

function getRedesSociaisFallback(): WebhookRedesSociaisData["plataformas"] {
  return [
    { nome: "Instagram", seguidores: 18500, engajamento: 2300, alcance: 450000, crescimento_mensal: 15 },
    { nome: "Facebook", seguidores: 12800, engajamento: 1800, alcance: 280000, crescimento_mensal: 8 },
    { nome: "LinkedIn", seguidores: 8900, engajamento: 1200, alcance: 125000, crescimento_mensal: 22 },
    { nome: "YouTube", seguidores: 5100, engajamento: 890, alcance: 45000, crescimento_mensal: 35 },
  ]
}

function getFunilFallback(): WebhookFunilData["etapas"] {
  return [
    { nome: "Leads", quantidade: 1250 },
    { nome: "Qualificados", quantidade: 750, taxa_conversao: 60 },
    { nome: "Propostas", quantidade: 320, taxa_conversao: 43 },
    { nome: "Fechados", quantidade: 108, taxa_conversao: 34 },
  ]
}

// Novos fallbacks para ComercialTela01
function getMetricasPeriodicasFallback(): WebhookMetricasPeriodicasData {
  return {
    semanal: {
      vendas_totais: 125000,
      meta_vendas: 150000,
      tendencia_vendas: 8,
      leads_qualificados: 85,
      meta_leads: 100,
      tendencia_leads: -5,
      taxa_conversao: 14.2,
      meta_conversao: 15.0,
      tendencia_conversao: 2,
      meta_periodo: {
        atual: 25,
        total: 100,
      },
    },
    mensal: {
      vendas_totais: 450000,
      meta_vendas: 500000,
      tendencia_vendas: 12,
      leads_qualificados: 320,
      meta_leads: 350,
      tendencia_leads: 15,
      taxa_conversao: 16.8,
      meta_conversao: 15.0,
      tendencia_conversao: 12,
      meta_periodo: {
        atual: 72,
        total: 100,
      },
    },
    anual: {
      vendas_totais: 4200000,
      meta_vendas: 6000000,
      tendencia_vendas: 18,
      leads_qualificados: 2850,
      meta_leads: 4000,
      tendencia_leads: 22,
      taxa_conversao: 15.4,
      meta_conversao: 16.0,
      tendencia_conversao: -3,
      meta_periodo: {
        atual: 58,
        total: 100,
      },
    },
  }
}

// Novos fallbacks para ComercialTela02
function getVendasProdutosFallback(): WebhookVendasProdutosData {
  return {
    produtos: [
      { nome: "Produto A", vendas: 180000, meta: 200000, categoria: "Premium" },
      { nome: "Produto B", vendas: 150000, meta: 160000, categoria: "Standard" },
      { nome: "Produto C", vendas: 120000, meta: 140000, categoria: "Basic" },
      { nome: "Produto D", vendas: 95000, meta: 100000, categoria: "Premium" },
      { nome: "Produto E", vendas: 85000, meta: 90000, categoria: "Standard" },
    ],
  }
}

function getAtividadesFallback(): WebhookAtividadesComerciais {
  return {
    atividades: [
      { tipo: "Ligações", realizadas: 1250, meta: 1200, responsavel: "Equipe Comercial" },
      { tipo: "E-mails", realizadas: 890, meta: 800, responsavel: "Equipe Comercial" },
      { tipo: "Reuniões", realizadas: 145, meta: 150, responsavel: "Gerentes" },
      { tipo: "Propostas", realizadas: 89, meta: 100, responsavel: "Consultores" },
      { tipo: "Follow-ups", realizadas: 320, meta: 300, responsavel: "SDRs" },
    ],
  }
}

function getFunilDetalhadoFallback(): WebhookFunilDetalhadoData {
  return {
    etapas: [
      {
        nome: "Leads",
        quantidade: 1250,
        valor_total: 2500000,
        tempo_medio_dias: 1,
        oportunidades_perdidas: 0,
      },
      {
        nome: "Qualificados",
        quantidade: 750,
        taxa_conversao: 60,
        valor_total: 1875000,
        tempo_medio_dias: 3,
        oportunidades_perdidas: 500,
      },
      {
        nome: "Propostas",
        quantidade: 320,
        taxa_conversao: 43,
        valor_total: 1280000,
        tempo_medio_dias: 7,
        oportunidades_perdidas: 430,
      },
      {
        nome: "Fechados",
        quantidade: 108,
        taxa_conversao: 34,
        valor_total: 540000,
        tempo_medio_dias: 14,
        oportunidades_perdidas: 212,
      },
    ],
  }
}

// Novo fallback para Suporte
function getSuporteFallback(): WebhookSuporteData {
  return {
    generalMetrics: {
      status: "online",
      totalTickets: 1247,
      openTickets: 89,
      closedTickets: 1158,
      activeAgents: 12,
      totalAgents: 15,
    },
    performanceMetrics: [
      { name: "TMR", value: 2.3, target: 3.0, unit: "min", trend: 15 },
      { name: "FCR", value: 87, target: 85, unit: "%", trend: 8 },
      { name: "CSAT", value: 4.6, target: 4.5, unit: "/5", trend: 12 },
      { name: "SLA", value: 94, target: 90, unit: "%", trend: 5 },
    ],
    agents: [
      { name: "Ana Silva", status: "online", ticketsHandled: 23, avgResponseTime: 1.8, satisfaction: 4.8 },
      { name: "Carlos Santos", status: "busy", ticketsHandled: 19, avgResponseTime: 2.1, satisfaction: 4.7 },
      { name: "Maria Costa", status: "online", ticketsHandled: 21, avgResponseTime: 1.9, satisfaction: 4.9 },
      { name: "João Oliveira", status: "away", ticketsHandled: 17, avgResponseTime: 2.4, satisfaction: 4.5 },
    ],
    queue: [
      { customer: "Cliente A", subject: "Problema de login", priority: "high", waitTime: 5, category: "Técnico" },
      {
        customer: "Cliente B",
        subject: "Dúvida sobre fatura",
        priority: "medium",
        waitTime: 12,
        category: "Financeiro",
      },
      { customer: "Cliente C", subject: "Solicitação de upgrade", priority: "low", waitTime: 8, category: "Comercial" },
    ],
  }
}

// Novos fallbacks para Ranking de Vendas
function getRankingVendasFallback(): WebhookRankingVendasData {
  return {
    vendedores: [
      {
        id: "1",
        nome: "João Silva",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 45000,
        meta: 40000,
        percentual: 113,
        status: "Superou",
        posicao: 1,
        atividades: {
          ligacoes: 150,
          reunioes: 25,
          propostas: 12,
          emails: 89,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 42000, meta: 40000 },
          { mes: "Fev", vendas: 38000, meta: 40000 },
          { mes: "Mar", vendas: 45000, meta: 40000 },
        ],
      },
      {
        id: "2",
        nome: "Pedro Costa",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 42000,
        meta: 40000,
        percentual: 105,
        status: "Superou",
        posicao: 2,
        atividades: {
          ligacoes: 140,
          reunioes: 22,
          propostas: 10,
          emails: 76,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 39000, meta: 40000 },
          { mes: "Fev", vendas: 41000, meta: 40000 },
          { mes: "Mar", vendas: 42000, meta: 40000 },
        ],
      },
      {
        id: "3",
        nome: "Maria Santos",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 38000,
        meta: 40000,
        percentual: 95,
        status: "Próximo",
        posicao: 3,
        atividades: {
          ligacoes: 130,
          reunioes: 20,
          propostas: 8,
          emails: 65,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 36000, meta: 40000 },
          { mes: "Fev", vendas: 37000, meta: 40000 },
          { mes: "Mar", vendas: 38000, meta: 40000 },
        ],
      },
      {
        id: "4",
        nome: "Ana Oliveira",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 35000,
        meta: 40000,
        percentual: 88,
        status: "Abaixo",
        posicao: 4,
        atividades: {
          ligacoes: 120,
          reunioes: 18,
          propostas: 7,
          emails: 54,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 33000, meta: 40000 },
          { mes: "Fev", vendas: 34000, meta: 40000 },
          { mes: "Mar", vendas: 35000, meta: 40000 },
        ],
      },
      {
        id: "5",
        nome: "Carlos Ferreira",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 33000,
        meta: 40000,
        percentual: 83,
        status: "Abaixo",
        posicao: 5,
        atividades: {
          ligacoes: 115,
          reunioes: 16,
          propostas: 6,
          emails: 48,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 31000, meta: 40000 },
          { mes: "Fev", vendas: 32000, meta: 40000 },
          { mes: "Mar", vendas: 33000, meta: 40000 },
        ],
      },
      {
        id: "6",
        nome: "Lucia Mendes",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 31000,
        meta: 40000,
        percentual: 78,
        status: "Abaixo",
        posicao: 6,
        atividades: {
          ligacoes: 110,
          reunioes: 15,
          propostas: 5,
          emails: 42,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 29000, meta: 40000 },
          { mes: "Fev", vendas: 30000, meta: 40000 },
          { mes: "Mar", vendas: 31000, meta: 40000 },
        ],
      },
      {
        id: "7",
        nome: "Roberto Lima",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 29000,
        meta: 40000,
        percentual: 73,
        status: "Abaixo",
        posicao: 7,
        atividades: {
          ligacoes: 105,
          reunioes: 14,
          propostas: 4,
          emails: 38,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 27000, meta: 40000 },
          { mes: "Fev", vendas: 28000, meta: 40000 },
          { mes: "Mar", vendas: 29000, meta: 40000 },
        ],
      },
      {
        id: "8",
        nome: "Fernanda Rocha",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 27000,
        meta: 40000,
        percentual: 68,
        status: "Abaixo",
        posicao: 8,
        atividades: {
          ligacoes: 100,
          reunioes: 13,
          propostas: 3,
          emails: 35,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 25000, meta: 40000 },
          { mes: "Fev", vendas: 26000, meta: 40000 },
          { mes: "Mar", vendas: 27000, meta: 40000 },
        ],
      },
      {
        id: "9",
        nome: "Ricardo Alves",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 25000,
        meta: 40000,
        percentual: 63,
        status: "Abaixo",
        posicao: 9,
        atividades: {
          ligacoes: 95,
          reunioes: 12,
          propostas: 2,
          emails: 32,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 23000, meta: 40000 },
          { mes: "Fev", vendas: 24000, meta: 40000 },
          { mes: "Mar", vendas: 25000, meta: 40000 },
        ],
      },
      {
        id: "10",
        nome: "Juliana Campos",
        foto: "/placeholder.svg?height=100&width=100",
        vendas: 23000,
        meta: 40000,
        percentual: 58,
        status: "Abaixo",
        posicao: 10,
        atividades: {
          ligacoes: 90,
          reunioes: 11,
          propostas: 1,
          emails: 28,
        },
        historico_mensal: [
          { mes: "Jan", vendas: 21000, meta: 40000 },
          { mes: "Fev", vendas: 22000, meta: 40000 },
          { mes: "Mar", vendas: 23000, meta: 40000 },
        ],
      },
    ],
    metas_gerais: {
      meta_total_equipe: 400000,
      vendas_total_equipe: 328000,
      percentual_equipe: 82,
      vendedores_acima_meta: 2,
      vendedores_proximo_meta: 1,
      vendedores_abaixo_meta: 7,
    },
    periodo_competicao: {
      inicio: "2024-03-01",
      fim: "2024-03-31",
      mes_referencia: "Março 2024",
    },
  }
}

function getRankingVendas02Fallback(): WebhookRankingVendas02Data {
  return {
    vendedores: [
      {
        id: "1",
        nome: "João Silva",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 45000,
        meta_mes: 40000,
        percentual_mes: 113,
        status: "Superou",
        posicao: 1,
        performance_periodo: {
          hoje: {
            vendas: 2132,
            meta_diaria: 1600,
            atividades: 8,
          },
          semana: {
            vendas: 9652,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 45000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: 8,
          vendas_semanais: 12,
          vendas_mensais: 15,
        },
      },
      {
        id: "2",
        nome: "Pedro Costa",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 42000,
        meta_mes: 40000,
        percentual_mes: 105,
        status: "Superou",
        posicao: 2,
        performance_periodo: {
          hoje: {
            vendas: 1924,
            meta_diaria: 1600,
            atividades: 7,
          },
          semana: {
            vendas: 8932,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 42000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: 5,
          vendas_semanais: 8,
          vendas_mensais: 10,
        },
      },
      {
        id: "3",
        nome: "Maria Santos",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 38000,
        meta_mes: 40000,
        percentual_mes: 95,
        status: "Próximo",
        posicao: 3,
        performance_periodo: {
          hoje: {
            vendas: 2034,
            meta_diaria: 1600,
            atividades: 6,
          },
          semana: {
            vendas: 8408,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 38000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: 2,
          vendas_semanais: 5,
          vendas_mensais: 7,
        },
      },
      {
        id: "4",
        nome: "Ana Oliveira",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 35000,
        meta_mes: 40000,
        percentual_mes: 88,
        status: "Abaixo",
        posicao: 4,
        performance_periodo: {
          hoje: {
            vendas: 1885,
            meta_diaria: 1600,
            atividades: 5,
          },
          semana: {
            vendas: 9055,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 35000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -2,
          vendas_semanais: 3,
          vendas_mensais: 5,
        },
      },
      {
        id: "5",
        nome: "Carlos Ferreira",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 33000,
        meta_mes: 40000,
        percentual_mes: 83,
        status: "Abaixo",
        posicao: 5,
        performance_periodo: {
          hoje: {
            vendas: 1924,
            meta_diaria: 1600,
            atividades: 4,
          },
          semana: {
            vendas: 8932,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 33000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -5,
          vendas_semanais: 1,
          vendas_mensais: 3,
        },
      },
      {
        id: "6",
        nome: "Lucia Mendes",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 31000,
        meta_mes: 40000,
        percentual_mes: 78,
        status: "Abaixo",
        posicao: 6,
        performance_periodo: {
          hoje: {
            vendas: 1443,
            meta_diaria: 1600,
            atividades: 3,
          },
          semana: {
            vendas: 7928,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 31000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -8,
          vendas_semanais: -2,
          vendas_mensais: 1,
        },
      },
      {
        id: "7",
        nome: "Roberto Lima",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 29000,
        meta_mes: 40000,
        percentual_mes: 73,
        status: "Abaixo",
        posicao: 7,
        performance_periodo: {
          hoje: {
            vendas: 1381,
            meta_diaria: 1600,
            atividades: 2,
          },
          semana: {
            vendas: 7446,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 29000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -10,
          vendas_semanais: -5,
          vendas_mensais: -2,
        },
      },
      {
        id: "8",
        nome: "Fernanda Rocha",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 27000,
        meta_mes: 40000,
        percentual_mes: 68,
        status: "Abaixo",
        posicao: 8,
        performance_periodo: {
          hoje: {
            vendas: 1149,
            meta_diaria: 1600,
            atividades: 1,
          },
          semana: {
            vendas: 8018,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 27000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -12,
          vendas_semanais: -8,
          vendas_mensais: -5,
        },
      },
      {
        id: "9",
        nome: "Ricardo Alves",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 25000,
        meta_mes: 40000,
        percentual_mes: 63,
        status: "Abaixo",
        posicao: 9,
        performance_periodo: {
          hoje: {
            vendas: 1282,
            meta_diaria: 1600,
            atividades: 1,
          },
          semana: {
            vendas: 7383,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 25000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -15,
          vendas_semanais: -10,
          vendas_mensais: -8,
        },
      },
      {
        id: "10",
        nome: "Juliana Campos",
        foto: "/placeholder.svg?height=100&width=100",
        vendas_mes: 23000,
        meta_mes: 40000,
        percentual_mes: 58,
        status: "Abaixo",
        posicao: 10,
        performance_periodo: {
          hoje: {
            vendas: 1268,
            meta_diaria: 1600,
            atividades: 0,
          },
          semana: {
            vendas: 5261,
            meta_semanal: 8000,
            dias_trabalhados: 5,
          },
          mes: {
            vendas: 23000,
            meta_mensal: 40000,
            dias_trabalhados: 20,
            dias_restantes: 5,
          },
        },
        tendencias: {
          vendas_diarias: -18,
          vendas_semanais: -12,
          vendas_mensais: -10,
        },
      },
    ],
    metricas_periodo: {
      total_vendas_hoje: 16442,
      total_vendas_semana: 81415,
      total_vendas_mes: 328000,
      meta_total_mes: 400000,
      dias_uteis_mes: 25,
      dias_trabalhados: 20,
      dias_restantes: 5,
      media_diaria_necessaria: 14400,
    },
    comparativo_periodo: {
      mes_anterior: {
        vendas: 295000,
        percentual_crescimento: 11.2,
      },
      mesmo_periodo_ano_anterior: {
        vendas: 280000,
        percentual_crescimento: 17.1,
      },
    },
  }
}

function getFallbackData(): DashboardData {
  const { generateDashboardData } = require("./mockData")
  return generateDashboardData()
}

// Função para testar a conectividade dos webhooks
export async function testWebhookConnectivity(): Promise<{
  vendas: boolean
  marketing: boolean
  redes_sociais: boolean
  funil: boolean
  metricas_periodicas: boolean
  vendas_produtos: boolean
  atividades_comerciais: boolean
  funil_detalhado: boolean
  suporte: boolean
  ranking_vendas: boolean
  ranking_vendas_periodo: boolean
}> {
  const results = {
    vendas: false,
    marketing: false,
    redes_sociais: false,
    funil: false,
    metricas_periodicas: false,
    vendas_produtos: false,
    atividades_comerciais: false,
    funil_detalhado: false,
    suporte: false,
    ranking_vendas: false,
    ranking_vendas_periodo: false,
  }

  try {
    const promises = Object.entries(WEBHOOK_ENDPOINTS).map(async ([key, url]) => {
      try {
        const response = await fetch(url, { method: "HEAD" })
        return { key, success: response.ok }
      } catch {
        return { key, success: false }
      }
    })

    const responses = await Promise.all(promises)
    responses.forEach(({ key, success }) => {
      if (key in results) {
        results[key as keyof typeof results] = success
      }
    })
  } catch (error) {
    console.error("Erro ao testar conectividade dos webhooks:", error)
  }

  return results
}
