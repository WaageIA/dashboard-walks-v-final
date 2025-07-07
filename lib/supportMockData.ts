import type { SupportDashboardData } from "@/types/support"

// Função para gerar um número aleatório entre min e max
const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Função para gerar um tempo aleatório no formato "XhYYmin" ou "YYmin"
const randomTime = (maxHours = 2, maxMinutes = 59) => {
  const hours = randomNumber(0, maxHours)
  const minutes = randomNumber(1, maxMinutes)

  if (hours === 0) {
    return `${minutes}min`
  }

  return `${hours}h${minutes.toString().padStart(2, "0")}min`
}

// Função para gerar dados mock para o dashboard de suporte
export const generateSupportData = (): SupportDashboardData => {
  // Status geral - varia aleatoriamente
  const statusOptions = ["NORMAL", "ATENÇÃO", "CRÍTICO"]
  const statusColors = ["green", "yellow", "red"]
  const statusIndex = randomNumber(0, 2)

  // Número de tickets abertos - varia entre 30 e 60
  const ticketsAbertos = randomNumber(30, 60)

  // Número de tickets resolvidos - varia entre 100 e 150
  const ticketsResolvidos = randomNumber(100, 150)

  // Número de atendentes ativos - varia entre 6 e 10 de um total de 10
  const atendentesAtivos = randomNumber(6, 10)

  // Tempo médio de resposta - varia entre 1h e 2h30min
  const tempoMedioResposta = randomTime(2, 59)
  const tempoMedioAbaixoMeta = tempoMedioResposta.startsWith("1") || tempoMedioResposta.startsWith("0")

  // Taxa FCR - varia entre 65% e 85%
  const taxaFCR = randomNumber(65, 85)
  const taxaFCRAboveMeta = taxaFCR > 70

  // CSAT Score - varia entre 4.2 e 4.9
  const csatScore = (randomNumber(42, 49) / 10).toFixed(1)
  const csatAboveMeta = Number.parseFloat(csatScore) > 4.5

  // SLA Compliance - varia entre 85% e 98%
  const slaCompliance = randomNumber(85, 98)
  const slaAboveMeta = slaCompliance > 90

  // Nomes dos agentes
  const agentNames = ["Ana Silva", "Carlos Santos", "Maria Costa", "João Pereira", "Pedro Lima", "Bruno Ferreira"]

  // Status possíveis dos agentes
  const agentStatus = ["Online", "Ocupado", "Sobrecarregado", "Pausa"] as const

  // Gerar agentes com dados aleatórios
  const agents = agentNames.map((name, index) => {
    // Determinar status - maior probabilidade de estar online
    const statusIndex = randomNumber(0, 10) > 7 ? randomNumber(1, 3) : 0

    return {
      id: `agent-${index + 1}`,
      name,
      position: index + 1,
      status: agentStatus[statusIndex],
      stats: {
        emAtendimento: randomNumber(0, 5),
        resolvidos: randomNumber(8, 20),
        tmr: `${randomNumber(30, 90)}min`,
      },
    }
  })

  // Nomes de clientes
  const clientNames = [
    { nome: "João", empresa: "Padaria do João" },
    { nome: "Maria", empresa: "Boutique Maria" },
    { nome: "Pedro", empresa: "Mercado Pedro" },
    { nome: "Ana", empresa: "Sabor da Ana" },
    { nome: "Carlos", empresa: "Fast Carlos" },
  ]

  // Produtos
  const produtos = [
    { nome: "PDV", icon: "credit-card" },
    { nome: "Banco Digital", icon: "smartphone" },
    { nome: "Tap to Pay", icon: "credit-card" },
    { nome: "Totem", icon: "monitor" },
    { nome: "Marketplace", icon: "store" },
  ]

  // Gerar itens da fila com dados aleatórios
  const queue = clientNames.map((client, index) => {
    const produto = produtos[randomNumber(0, produtos.length - 1)]
    const prioridades = ["Alta", "Média", "Baixa"] as const
    const prioridadeIndex = randomNumber(0, 2)

    return {
      id: `queue-${index + 1}`,
      cliente: client.nome,
      empresa: client.empresa,
      produto: produto.nome,
      icon: produto.icon,
      aguardando: `${randomNumber(3, 15)}min`,
      prioridade: prioridades[prioridadeIndex],
    }
  })

  return {
    lastUpdate: new Date(),
    generalMetrics: [
      {
        title: "Status Geral",
        value: statusOptions[statusIndex],
        icon: "check-circle",
        color: statusColors[statusIndex],
      },
      {
        title: "Tickets Abertos",
        value: ticketsAbertos,
        icon: "ticket",
        color: "yellow",
      },
      {
        title: "Resolvidos Hoje",
        value: ticketsResolvidos,
        icon: "check-square",
        color: "green",
      },
      {
        title: "Atendentes Ativos",
        value: `${atendentesAtivos}/10`,
        icon: "users",
        color: "purple",
      },
    ],
    performanceMetrics: [
      {
        title: "Tempo Médio Resposta",
        value: tempoMedioResposta,
        icon: "clock",
        color: tempoMedioAbaixoMeta ? "green" : "red",
        hasTarget: true,
        target: "< 2h",
        targetMet: tempoMedioAbaixoMeta,
      },
      {
        title: "Taxa FCR",
        value: `${taxaFCR}%`,
        icon: "target",
        color: taxaFCRAboveMeta ? "green" : "red",
        hasTarget: true,
        target: "> 70%",
        targetMet: taxaFCRAboveMeta,
      },
      {
        title: "CSAT Score",
        value: `${csatScore}/5`,
        icon: "star",
        color: csatAboveMeta ? "green" : "red",
        hasTarget: true,
        target: "> 4.5",
        targetMet: csatAboveMeta,
      },
      {
        title: "SLA Compliance",
        value: `${slaCompliance}%`,
        icon: "shield-check",
        color: slaAboveMeta ? "green" : "red",
        hasTarget: true,
        target: "> 90%",
        targetMet: slaAboveMeta,
      },
    ],
    agents,
    queue,
  }
}
