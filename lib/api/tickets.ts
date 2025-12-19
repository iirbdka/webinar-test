import { createClient } from '../supabase/server'
import type { Ticket } from '../schemas/ticket'

export async function getTickets(): Promise<Ticket[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tickets:', error)
    throw error
  }

  return data.map((ticket: any) => ({
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    requesterId: ticket.requester_id,
    assigneeId: ticket.assignee_id,
    assetId: ticket.asset_id,
    tags: ticket.tags,
    companyId: ticket.company_id,
    createdAt: new Date(ticket.created_at),
    updatedAt: new Date(ticket.updated_at),
  }))
}

export async function getTicketById(id: string): Promise<Ticket | null> {
  const supabase = await createClient()
  
  const { data: ticket, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching ticket:', error)
    return null
  }

  return {
    id: ticket.id,
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    requesterId: ticket.requester_id,
    assigneeId: ticket.assignee_id,
    assetId: ticket.asset_id,
    tags: ticket.tags,
    companyId: ticket.company_id,
    createdAt: new Date(ticket.created_at),
    updatedAt: new Date(ticket.updated_at),
  }
}
