import { createClient } from '../supabase/server'
import type { DashboardSummary } from '../schemas/dashboard'

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const supabase = await createClient()
  
  // Get asset counts by state
  const { data: assets, error: assetsError } = await supabase
    .from('assets')
    .select('state, type')

  if (assetsError) {
    console.error('Error fetching assets:', assetsError)
    throw assetsError
  }

  // Get ticket counts by status
  const { data: tickets, error: ticketsError } = await supabase
    .from('tickets')
    .select('status')

  if (ticketsError) {
    console.error('Error fetching tickets:', ticketsError)
    throw ticketsError
  }

  // Get expiring assets (within 90 days)
  const ninetyDaysFromNow = new Date()
  ninetyDaysFromNow.setDate(ninetyDaysFromNow.getDate() + 90)

  const { data: expiringAssets, error: expiringError } = await supabase
    .from('intangible_asset_fields')
    .select('asset_id')
    .lte('expiry_date', ninetyDaysFromNow.toISOString().split('T')[0])
    .gte('expiry_date', new Date().toISOString().split('T')[0])

  if (expiringError) {
    console.error('Error fetching expiring assets:', expiringError)
    throw expiringError
  }

  // Calculate summary
  const assetsByState = {
    ready: assets.filter(a => a.state === 'READY').length,
    inUse: assets.filter(a => a.state === 'IN_USE').length,
    maintenance: assets.filter(a => a.state === 'MAINTENANCE').length,
    pendingDisposal: assets.filter(a => a.state === 'PENDING_DISPOSAL').length,
    disposed: assets.filter(a => a.state === 'DISPOSED').length,
  }

  const assetsByType = {
    tangible: assets.filter(a => a.type === 'TANGIBLE').length,
    intangible: assets.filter(a => a.type === 'INTANGIBLE').length,
  }

  const ticketsByStatus = {
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    completed: tickets.filter(t => t.status === 'COMPLETED').length,
    rejected: tickets.filter(t => t.status === 'REJECTED').length,
  }

  return {
    totalAssets: assets.length,
    assetsByState,
    assetsByType,
    ticketsByStatus,
    expiringAssets: expiringAssets.length,
    recentActivity: ticketsByStatus.open + ticketsByStatus.inProgress,
  }
}

export async function getRecentAssets() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('assets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching recent assets:', error)
    return []
  }

  return data.map((asset: any) => ({
    id: asset.id,
    name: asset.name,
    description: asset.description,
    type: asset.type,
    state: asset.state,
    categoryId: asset.category_id,
    assigneeId: asset.assignee_id,
    orgUnitId: asset.org_unit_id,
    companyId: asset.company_id,
    createdAt: new Date(asset.created_at),
    updatedAt: new Date(asset.updated_at),
  }))
}

export async function getRecentTickets() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  if (error) {
    console.error('Error fetching recent tickets:', error)
    return []
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
