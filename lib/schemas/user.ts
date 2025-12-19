import { z } from "zod"

// ============================================
// USER & ORG SCHEMAS - Zod definitions
// ============================================

export const RoleSchema = z.enum(["ADMIN", "MANAGER", "MEMBER"])

export const UserStatusSchema = z.enum(["ACTIVE", "INACTIVE", "PENDING"])

export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  plan: z.enum(["FREE", "PRO", "ENTERPRISE"]),
  createdAt: z.coerce.date(),
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  avatarUrl: z.string().url().nullable(),
  role: RoleSchema,
  status: UserStatusSchema,
  companyId: z.string().uuid(),
  createdAt: z.coerce.date(),
})

export const OrgUnitSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  parentId: z.string().uuid().nullable(),
  companyId: z.string().uuid(),
  createdAt: z.coerce.date(),
})

// Type exports
export type Role = z.infer<typeof RoleSchema>
export type UserStatus = z.infer<typeof UserStatusSchema>
export type Company = z.infer<typeof CompanySchema>
export type User = z.infer<typeof UserSchema>
export type OrgUnit = z.infer<typeof OrgUnitSchema>
