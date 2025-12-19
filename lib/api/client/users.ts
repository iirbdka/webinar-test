import { createClient } from '../../supabase/client'
import type { User, OrgUnit } from '../../schemas/user'

export async function getUsers(): Promise<User[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching users:', error)
    throw error
  }

  return data.map((user: any) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatar_url,
    role: user.role,
    status: user.status,
    companyId: user.company_id,
    createdAt: new Date(user.created_at),
  }))
}

export async function getOrgUnits(): Promise<OrgUnit[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('org_units')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching org units:', error)
    throw error
  }

  return data.map((unit: any) => ({
    id: unit.id,
    name: unit.name,
    parentId: unit.parent_id,
    companyId: unit.company_id,
    createdAt: new Date(unit.created_at),
  }))
}

