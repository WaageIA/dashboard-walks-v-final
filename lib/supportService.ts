import { supabase } from './supabaseClient';
import { SupportTicket, SupportAgent, QueueItem } from '@/types/support';

/**
 * Busca todos os tickets de suporte
 */
export async function getSupportTickets(): Promise<SupportTicket[]> {
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching support tickets:', error);
    throw new Error('Could not fetch support tickets');
  }

  return data as SupportTicket[];
}

/**
 * Busca todos os agentes de suporte
 */
export async function getSupportAgents(): Promise<SupportAgent[]> {
  const { data, error } = await supabase
    .from('support_agents')
    .select('*')
    .order('position', { ascending: true });

  if (error) {
    console.error('Error fetching support agents:', error);
    throw new Error('Could not fetch support agents');
  }

  return data as SupportAgent[];
}

/**
 * Busca a fila de espera atual
 */
export async function getSupportQueue(): Promise<QueueItem[]> {
  const { data, error } = await supabase
    .from('support_queue')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching support queue:', error);
    throw new Error('Could not fetch support queue');
  }

  return data as QueueItem[];
}

/**
 * Busca todos os dados de suporte em paralelo
 */
export async function getAllSupportData(): Promise<{
  tickets: SupportTicket[];
  agents: SupportAgent[];
  queue: QueueItem[];
}> {
  try {
    const [tickets, agents, queue] = await Promise.all([
      getSupportTickets(),
      getSupportAgents(),
      getSupportQueue(),
    ]);

    return { tickets, agents, queue };
  } catch (error) {
    console.error('Error fetching all support data:', error);
    throw new Error('Could not fetch complete support data');
  }
}
