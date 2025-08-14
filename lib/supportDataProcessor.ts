import type { SupportTicket, SupportAgent, QueueItem, SupportDashboardData, Metric } from '@/types/support';

/**
 * Transforma dados brutos dos tickets em formato do dashboard
 */
export function transformSupportData(
    tickets: SupportTicket[],
    agents: SupportAgent[] = [],
    queue: QueueItem[] = []
): SupportDashboardData {
    // Cálculos baseados nos tickets
    const ticketsAbertos = tickets.filter(t => t.status !== 'Resolved' && t.status !== 'Closed').length;
    const resolvidosHoje = tickets.filter(t =>
        t.resolved_at && new Date(t.resolved_at).toDateString() === new Date().toDateString()
    ).length;

    // Cálculo do CSAT Score
    const totalCsat = tickets.filter(t => t.csat_score).reduce((acc, t) => acc + t.csat_score!, 0);
    const csatCount = tickets.filter(t => t.csat_score).length;
    const csatScore = csatCount > 0 ? (totalCsat / csatCount).toFixed(1) : "N/A";

    // Cálculo da Taxa FCR (First Call Resolution)
    const fcrCount = tickets.filter(t => t.fcr).length;
    const taxaFCR = tickets.length > 0 ? ((fcrCount / tickets.length) * 100).toFixed(0) : "0";

    // Cálculo do Tempo Médio de Resposta
    const responseTimes = tickets.filter(t => t.response_time_minutes).map(t => t.response_time_minutes!);
    const avgResponseTime = responseTimes.length > 0
        ? Math.round(responseTimes.reduce((acc, time) => acc + time, 0) / responseTimes.length)
        : 0;

    // Cálculo de SLA Compliance (assumindo SLA de 24h para resolução)
    const resolvedTickets = tickets.filter(t => t.resolved_at);
    const slaCompliantTickets = resolvedTickets.filter(t => {
        const created = new Date(t.created_at);
        const resolved = new Date(t.resolved_at!);
        const hoursDiff = (resolved.getTime() - created.getTime()) / (1000 * 60 * 60);
        return hoursDiff <= 24;
    });
    const slaCompliance = resolvedTickets.length > 0
        ? ((slaCompliantTickets.length / resolvedTickets.length) * 100).toFixed(0)
        : "100";

    // Usar dados reais de agentes se disponíveis, senão usar mock
    const finalAgents = agents.length > 0 ? agents : getMockAgents();

    // Usar dados reais da fila se disponíveis, senão usar mock
    const finalQueue = queue.length > 0 ? queue : getMockQueue();

    return {
        lastUpdate: new Date(),
        generalMetrics: [
            { title: "Status Geral", value: "NORMAL", icon: "check-circle", color: "green" },
            { title: "Tickets Abertos", value: ticketsAbertos, icon: "ticket", color: "yellow" },
            { title: "Resolvidos Hoje", value: resolvidosHoje, icon: "check-square", color: "green" },
            { title: "Atendentes Ativos", value: `${finalAgents.filter(a => a.status === 'Online').length}/${finalAgents.length}`, icon: "users", color: "purple" },
        ],
        performanceMetrics: [
            {
                title: "Tempo Médio Resposta",
                value: `${avgResponseTime}m`,
                icon: "clock",
                color: avgResponseTime <= 10 ? "green" : "red",
                hasTarget: true,
                target: "< 10m",
                targetMet: avgResponseTime <= 10
            },
            {
                title: "Taxa FCR",
                value: `${taxaFCR}%`,
                icon: "target",
                color: Number(taxaFCR) > 80 ? "green" : "red",
                hasTarget: true,
                target: "> 80%",
                targetMet: Number(taxaFCR) > 80
            },
            {
                title: "CSAT Score",
                value: `${csatScore}/5`,
                icon: "star",
                color: Number(csatScore) > 4.5 ? "green" : "red",
                hasTarget: true,
                target: "> 4.5",
                targetMet: Number(csatScore) > 4.5
            },
            {
                title: "SLA Compliance",
                value: `${slaCompliance}%`,
                icon: "shield-check",
                color: Number(slaCompliance) > 95 ? "green" : "red",
                hasTarget: true,
                target: "> 95%",
                targetMet: Number(slaCompliance) > 95
            },
        ],
        agents: finalAgents,
        queue: finalQueue,
    };
}

/**
 * Dados mock para agentes (usado quando não há dados reais)
 */
function getMockAgents(): SupportAgent[] {
    return [
        {
            id: '1',
            name: 'Ana Silva',
            photo: '/placeholder-user.jpg',
            position: 1,
            status: 'Online',
            stats: { emAtendimento: 3, resolvidos: 12, tmr: '5m' }
        },
        {
            id: '2',
            name: 'Carlos Santos',
            photo: '/placeholder-user.jpg',
            position: 2,
            status: 'Ocupado',
            stats: { emAtendimento: 5, resolvidos: 10, tmr: '8m' }
        },
        {
            id: '3',
            name: 'Maria Costa',
            photo: '/placeholder-user.jpg',
            position: 3,
            status: 'Online',
            stats: { emAtendimento: 2, resolvidos: 8, tmr: '6m' }
        },
    ];
}

/**
 * Dados mock para fila (usado quando não há dados reais)
 */
function getMockQueue(): QueueItem[] {
    return [
        {
            id: 'q1',
            cliente: 'Empresa Tech Solutions',
            empresa: 'Tecnologia',
            produto: 'API Integration',
            icon: 'credit-card',
            prioridade: 'Alta',
            aguardando: '15m'
        },
        {
            id: 'q2',
            cliente: 'Loja Virtual ABC',
            empresa: 'E-commerce',
            produto: 'Payment Gateway',
            icon: 'store',
            prioridade: 'Média',
            aguardando: '8m'
        },
        {
            id: 'q3',
            cliente: 'StartupXYZ',
            empresa: 'Fintech',
            produto: 'Mobile SDK',
            icon: 'smartphone',
            prioridade: 'Baixa',
            aguardando: '3m'
        },
    ];
}