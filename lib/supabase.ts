import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          name: string
          plan: 'FREE' | 'PRO' | 'ENTERPRISE'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['companies']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['companies']['Insert']>
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          role: 'ADMIN' | 'MANAGER' | 'MEMBER'
          status: 'ACTIVE' | 'INACTIVE' | 'PENDING'
          company_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      org_units: {
        Row: {
          id: string
          name: string
          parent_id: string | null
          company_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['org_units']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['org_units']['Insert']>
      }
      categories: {
        Row: {
          id: string
          name: string
          parent_id: string | null
          company_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
      }
      assets: {
        Row: {
          id: string
          name: string
          description: string | null
          type: 'TANGIBLE' | 'INTANGIBLE'
          state: 'READY' | 'IN_USE' | 'MAINTENANCE' | 'PENDING_DISPOSAL' | 'DISPOSED'
          category_id: string
          assignee_id: string | null
          org_unit_id: string | null
          company_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['assets']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['assets']['Insert']>
      }
      tangible_asset_fields: {
        Row: {
          asset_id: string
          serial_number: string | null
          purchase_price: number | null
          purchase_date: string | null
          depreciation_rate: number | null
        }
        Insert: Database['public']['Tables']['tangible_asset_fields']['Row']
        Update: Partial<Database['public']['Tables']['tangible_asset_fields']['Row']>
      }
      intangible_asset_fields: {
        Row: {
          asset_id: string
          expiry_date: string | null
          renewal_cycle: 'MONTHLY' | 'YEARLY' | null
          account_info: string | null
          url: string | null
        }
        Insert: Database['public']['Tables']['intangible_asset_fields']['Row']
        Update: Partial<Database['public']['Tables']['intangible_asset_fields']['Row']>
      }
      tickets: {
        Row: {
          id: string
          title: string
          description: string
          status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'REJECTED'
          priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
          requester_id: string
          assignee_id: string | null
          asset_id: string | null
          tags: string[]
          company_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['tickets']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['tickets']['Insert']>
      }
      ticket_comments: {
        Row: {
          id: string
          ticket_id: string
          author_id: string
          content: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['ticket_comments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['ticket_comments']['Insert']>
      }
    }
  }
}

