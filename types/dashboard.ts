export interface Vendedor {
  id: string;
  nome: string;
  foto: string;
  vendas: number;
  meta: number;
  percentual: number;
  status: "Superou" | "Próximo" | "Abaixo";
  posicao: number;
}

export interface DashboardData {
  metrics: Array<{
    type: "sales" | "leads" | "followers" | "conversion";
    title: string;
    value: string;
    trend: number;
    target?: string;
    percentage?: number;
  }>;
  salesData: Array<{
    day: string;
    sales: number;
    target: number;
  }>;
  marketingData: Array<{
    channel: string;
    leads: number;
  }>;
  salesFunnel: Array<{
    stage: string;
    count: number;
    conversionRate?: number;
  }>;
  salesTeam: Array<{
    name: string;
    sales: number;
    status: "Superou" | "Próximo" | "Abaixo";
    percentage: number;
  }>;
  campaigns: Array<{
    name: string;
    roi: number;
    spent: number;
    conversions: number;
  }>;
  // Add this new property for support data
  supportData?: {
    generalMetrics: {
      status: "online" | "offline" | "maintenance";
      totalTickets: number;
      openTickets: number;
      closedTickets: number;
      activeAgents: number;
      totalAgents: number;
    };
    performanceMetrics: Array<{
      name: string;
      value: number;
      target: number;
      unit: string;
      trend: number;
    }>;
    agents: Array<{
      name: string;
      status: "online" | "offline" | "busy" | "away";
      ticketsHandled: number;
      avgResponseTime: number;
      satisfaction: number;
    }>;
    queue: Array<{
      customer: string;
      subject: string;
      priority: "low" | "medium" | "high" | "urgent";
      waitTime: number;
      category: string;
    }>;
  };

  // Dados para Ranking de Vendas - usando os nomes corretos do payload
  rankingVendasData?: {
    vendedores: Array<{
      id: string;
      nome: string;
      foto?: string;
      vendas: number;
      meta: number;
      percentual: number;
      status: "Superou" | "Próximo" | "Abaixo";
      posicao: number;
      atividades: {
        ligacoes: number;
        reunioes: number;
        propostas: number;
        emails: number;
      };
      historico_mensal: Array<{
        mes: string;
        vendas: number;
        meta: number;
      }>;
    }>;
    metas_gerais: {
      meta_total_equipe: number;
      vendas_total_equipe: number;
      percentual_equipe: number;
      vendedores_acima_meta: number;
      vendedores_proximo_meta: number;
      vendedores_abaixo_meta: number;
    };
    periodo_competicao: {
      inicio: string;
      fim: string;
      mes_referencia: string;
    };
  };

  // Novos dados para Ranking de Vendas 02
  rankingVendas02Data?: {
    vendedores: Array<{
      id: string;
      nome: string;
      foto?: string;
      vendas_mes: number;
      meta_mes: number;
      percentual_mes: number;
      status: "Superou" | "Próximo" | "Abaixo";
      posicao: number;
      performance_periodo: {
        hoje: {
          vendas: number;
          meta_diaria: number;
          atividades: number;
        };
        semana: {
          vendas: number;
          meta_semanal: number;
          dias_trabalhados: number;
        };
        mes: {
          vendas: number;
          meta_mensal: number;
          dias_trabalhados: number;
          dias_restantes: number;
        };
      };
      tendencias: {
        vendas_diarias: number;
        vendas_semanais: number;
        vendas_mensais: number;
      };
    }>;
    metricas_periodo: {
      total_vendas_hoje: number;
      total_vendas_semana: number;
      total_vendas_mes: number;
      meta_total_mes: number;
      dias_uteis_mes: number;
      dias_trabalhados: number;
      dias_restantes: number;
      media_diaria_necessaria: number;
    };
    comparativo_periodo: {
      mes_anterior: {
        vendas: number;
        percentual_crescimento: number;
      };
      mesmo_periodo_ano_anterior: {
        vendas: number;
        percentual_crescimento: number;
      };
    };
  };
}