import { createClient } from '../../supabase/client'
import type { Asset, Category } from '../../schemas/asset'

export async function getAssets(): Promise<Asset[]> {
  const supabase = createClient()
  
  const { data: assets, error } = await supabase
    .from('assets')
    .select(`
      *,
      tangible_asset_fields:tangible_asset_fields(*),
      intangible_asset_fields:intangible_asset_fields(*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching assets:', error)
    throw error
  }

  return assets.map((asset: any) => ({
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
    tangibleFields: asset.tangible_asset_fields?.[0] ? {
      serialNumber: asset.tangible_asset_fields[0].serial_number,
      purchasePrice: asset.tangible_asset_fields[0].purchase_price,
      purchaseDate: asset.tangible_asset_fields[0].purchase_date ? new Date(asset.tangible_asset_fields[0].purchase_date) : null,
      depreciationRate: asset.tangible_asset_fields[0].depreciation_rate,
    } : null,
    intangibleFields: asset.intangible_asset_fields?.[0] ? {
      expiryDate: asset.intangible_asset_fields[0].expiry_date ? new Date(asset.intangible_asset_fields[0].expiry_date) : null,
      renewalCycle: asset.intangible_asset_fields[0].renewal_cycle,
      accountInfo: asset.intangible_asset_fields[0].account_info,
      url: asset.intangible_asset_fields[0].url,
    } : null,
  }))
}

export async function getCategories(): Promise<Category[]> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }

  return data.map((cat: any) => ({
    id: cat.id,
    name: cat.name,
    parentId: cat.parent_id,
    companyId: cat.company_id,
    createdAt: new Date(cat.created_at),
  }))
}

