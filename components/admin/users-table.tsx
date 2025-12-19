"use client"

import type { User } from "@/lib/schemas/user"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const roleLabels: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  ADMIN: { label: "관리자", variant: "default" },
  MANAGER: { label: "매니저", variant: "secondary" },
  MEMBER: { label: "멤버", variant: "outline" },
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  ACTIVE: { label: "활성", variant: "default" },
  INACTIVE: { label: "비활성", variant: "secondary" },
  PENDING: { label: "대기", variant: "outline" },
}

interface UsersTableProps {
  users: User[]
}

export function UsersTable({ users }: UsersTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>사용자</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>역할</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>가입일</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => {
            const role = roleLabels[user.role]
            const status = statusLabels[user.status]

            return (
              <TableRow key={user.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.avatarUrl || undefined} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-foreground">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={role.variant}>{role.label}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.createdAt.toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>프로필 보기</DropdownMenuItem>
                      <DropdownMenuItem>역할 변경</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">비활성화</DropdownMenuItem>
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
