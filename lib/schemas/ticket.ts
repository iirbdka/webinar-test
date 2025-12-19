import { z } from "zod"

// ============================================
// TICKET SCHEMAS - Zod definitions for tickets
// ============================================

export const TicketStatusSchema = z.enum(["OPEN", "IN_PROGRESS", "COMPLETED", "REJECTED"])

export const TicketPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"])

export const TicketSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  description: z.string(),
  status: TicketStatusSchema,
  priority: TicketPrioritySchema,
  requesterId: z.string().uuid(),
  assigneeId: z.string().uuid().nullable(),
  assetId: z.string().uuid().nullable(),
  tags: z.array(z.string()),
  companyId: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export const TicketCommentSchema = z.object({
  id: z.string().uuid(),
  ticketId: z.string().uuid(),
  authorId: z.string().uuid(),
  content: z.string().min(1),
  createdAt: z.coerce.date(),
})

export const CreateTicketInputSchema = TicketSchema.omit({
  id: true,
  companyId: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTicketInputSchema = CreateTicketInputSchema.partial()

// Type exports
export type TicketStatus = z.infer<typeof TicketStatusSchema>
export type TicketPriority = z.infer<typeof TicketPrioritySchema>
export type Ticket = z.infer<typeof TicketSchema>
export type TicketComment = z.infer<typeof TicketCommentSchema>
export type CreateTicketInput = z.infer<typeof CreateTicketInputSchema>
export type UpdateTicketInput = z.infer<typeof UpdateTicketInputSchema>
