import { z } from "zod"

// ============================================
// DASHBOARD SCHEMAS - Summary and analytics
// ============================================

export const DashboardSummarySchema = z.object({
  totalAssets: z.number(),
  assetsByState: z.object({
    ready: z.number(),
    inUse: z.number(),
    maintenance: z.number(),
    pendingDisposal: z.number(),
    disposed: z.number(),
  }),
  assetsByType: z.object({
    tangible: z.number(),
    intangible: z.number(),
  }),
  ticketsByStatus: z.object({
    open: z.number(),
    inProgress: z.number(),
    completed: z.number(),
    rejected: z.number(),
  }),
  expiringAssets: z.number(),
  recentActivity: z.number(),
})

export const AssetTrendDataSchema = z.object({
  date: z.string(),
  total: z.number(),
  added: z.number(),
  disposed: z.number(),
})

// Type exports
export type DashboardSummary = z.infer<typeof DashboardSummarySchema>
export type AssetTrendData = z.infer<typeof AssetTrendDataSchema>
