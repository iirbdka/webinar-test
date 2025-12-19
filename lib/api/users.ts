import { createClient } from '../supabase/server'
import type { User, OrgUnit, Company } from '../schemas/user'

export async function getUsers(): Promise<User[]> {
  const supabase = await createClient()
  
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

export async function getUserById(id: string): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching user:', error)
    return null
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarUrl: user.avatar_url,
    role: user.role,
    status: user.status,
    companyId: user.company_id,
    createdAt: new Date(user.created_at),
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createClient()
  
  const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
  if (authError || !authUser) {
    return null
  }

  return getUserById(authUser.id)
}

export async function getOrgUnits(): Promise<OrgUnit[]> {
  const supabase = await createClient()
  
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

export async function getCompany(): Promise<Company | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('companies')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching company:', error)
    return null
  }

  return {
    id: data.id,
    name: data.name,
    plan: data.plan,
    createdAt: new Date(data.created_at),
  }
}
