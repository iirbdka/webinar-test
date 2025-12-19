import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get the user's company_id
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('company_id')
      .eq('id', user.id)
      .single()

    if (userError || !userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const body = await request.json()
    const {
      name,
      description,
      type,
      state,
      categoryId,
      assigneeId,
      orgUnitId,
      tangibleFields,
      intangibleFields,
    } = body

    // Insert main asset record
    const { data: asset, error: assetError } = await supabase
      .from('assets')
      .insert({
        name,
        description,
        type,
        state,
        category_id: categoryId,
        assignee_id: assigneeId,
        org_unit_id: orgUnitId,
        company_id: userData.company_id,
      })
      .select()
      .single()

    if (assetError) {
      console.error('Error creating asset:', assetError)
      return NextResponse.json(
        { error: 'Failed to create asset' },
        { status: 500 }
      )
    }

    // Insert type-specific fields
    if (type === 'TANGIBLE' && tangibleFields) {
      const { error: tangibleError } = await supabase
        .from('tangible_asset_fields')
        .insert({
          asset_id: asset.id,
          serial_number: tangibleFields.serialNumber,
          purchase_price: tangibleFields.purchasePrice,
          purchase_date: tangibleFields.purchaseDate,
          depreciation_rate: tangibleFields.depreciationRate,
        })

      if (tangibleError) {
        console.error('Error creating tangible fields:', tangibleError)
        // Rollback: delete the asset
        await supabase.from('assets').delete().eq('id', asset.id)
        return NextResponse.json(
          { error: 'Failed to create tangible asset fields' },
          { status: 500 }
        )
      }
    } else if (type === 'INTANGIBLE' && intangibleFields) {
      const { error: intangibleError } = await supabase
        .from('intangible_asset_fields')
        .insert({
          asset_id: asset.id,
          expiry_date: intangibleFields.expiryDate,
          renewal_cycle: intangibleFields.renewalCycle,
          account_info: intangibleFields.accountInfo,
          url: intangibleFields.url,
        })

      if (intangibleError) {
        console.error('Error creating intangible fields:', intangibleError)
        // Rollback: delete the asset
        await supabase.from('assets').delete().eq('id', asset.id)
        return NextResponse.json(
          { error: 'Failed to create intangible asset fields' },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true, asset }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/assets:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

