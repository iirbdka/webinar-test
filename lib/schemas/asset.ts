import { z } from "zod"

// ============================================
// ASSET SCHEMAS - Zod definitions for assets
// ============================================

export const AssetStateSchema = z.enum(["READY", "IN_USE", "MAINTENANCE", "PENDING_DISPOSAL", "DISPOSED"])

export const AssetTypeSchema = z.enum(["TANGIBLE", "INTANGIBLE"])

export const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  parentId: z.string().uuid().nullable(),
  companyId: z.string().uuid(),
  createdAt: z.coerce.date(),
})

export const AssetBaseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().nullable(),
  type: AssetTypeSchema,
  state: AssetStateSchema,
  categoryId: z.string().uuid(),
  assigneeId: z.string().uuid().nullable(),
  orgUnitId: z.string().uuid().nullable(),
  companyId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const TangibleAssetFieldsSchema = z.object({
  serialNumber: z.string().nullable(),
  purchasePrice: z.number().nullable(),
  purchaseDate: z.coerce.date().nullable(),
  depreciationRate: z.number().min(0).max(100).nullable(),
})

export const IntangibleAssetFieldsSchema = z.object({
  expiryDate: z.coerce.date().nullable(),
  renewalCycle: z.enum(["MONTHLY", "YEARLY"]).nullable(),
  accountInfo: z.string().nullable(),
  url: z.string().url().nullable(),
})

export const AssetSchema = AssetBaseSchema.extend({
  tangibleFields: TangibleAssetFieldsSchema.nullable(),
  intangibleFields: IntangibleAssetFieldsSchema.nullable(),
})

export const CreateAssetInputSchema = AssetBaseSchema.omit({
  id: true,
  companyId: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  tangibleFields: TangibleAssetFieldsSchema.optional(),
  intangibleFields: IntangibleAssetFieldsSchema.optional(),
})

export const UpdateAssetInputSchema = CreateAssetInputSchema.partial()

export const AssetListQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  state: AssetStateSchema.optional(),
  type: AssetTypeSchema.optional(),
  categoryId: z.string().uuid().optional(),
  assigneeId: z.string().uuid().optional(),
  search: z.string().optional(),
})

// Type exports
export type AssetState = z.infer<typeof AssetStateSchema>
export type AssetType = z.infer<typeof AssetTypeSchema>
export type Category = z.infer<typeof CategorySchema>
export type Asset = z.infer<typeof AssetSchema>
export type CreateAssetInput = z.infer<typeof CreateAssetInputSchema>
export type UpdateAssetInput = z.infer<typeof UpdateAssetInputSchema>
export type AssetListQuery = z.infer<typeof AssetListQuerySchema>
