"use client"

import type { Ticket } from "@/lib/schemas/ticket"
import type { User } from "@/lib/schemas/user"
import type { Asset } from "@/lib/schemas/asset"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Ticket as TicketIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  OPEN: { label: "열림", variant: "outline" },
  IN_PROGRESS: { label: "진행중", variant: "default" },
  COMPLETED: { label: "완료", variant: "secondary" },
  REJECTED: { label: "거절", variant: "destructive" },
}

const priorityLabels: Record<string, { label: string; className: string }> = {
  LOW: { label: "낮음", className: "text-muted-foreground" },
  MEDIUM: { label: "보통", className: "text-blue-500" },
  HIGH: { label: "높음", className: "text-orange-500" },
  URGENT: { label: "긴급", className: "text-red-500" },
}

interface TicketsTableProps {
  tickets: Ticket[]
  users: User[]
  assets: Asset[]
}

export function TicketsTable({ tickets, users, assets }: TicketsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>제목</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>우선순위</TableHead>
            <TableHead>요청자</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>관련 자산</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => {
            const requester = users.find((u) => u.id === ticket.requesterId)
            const assignee = ticket.assigneeId ? users.find((u) => u.id === ticket.assigneeId) : null
            const asset = ticket.assetId ? assets.find((a) => a.id === ticket.assetId) : null
            const status = statusLabels[ticket.status]
            const priority = priorityLabels[ticket.priority]

            return (
              <TableRow key={ticket.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <TicketIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{ticket.title}</p>
                      <div className="flex gap-1 mt-1">
                        {ticket.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>
                  <span className={priority.className}>{priority.label}</span>
                </TableCell>
                <TableCell className="text-muted-foreground">{requester?.name}</TableCell>
                <TableCell className="text-muted-foreground">{assignee?.name || "-"}</TableCell>
                <TableCell className="text-muted-foreground">{asset?.name || "-"}</TableCell>
                <TableCell className="text-muted-foreground">{ticket.createdAt.toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>상세보기</DropdownMenuItem>
                      <DropdownMenuItem>상태 변경</DropdownMenuItem>
                      <DropdownMenuItem>담당자 배정</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
