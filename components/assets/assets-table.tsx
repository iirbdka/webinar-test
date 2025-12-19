"use client"

import type { Asset, Category } from "@/lib/schemas/asset"
import type { User } from "@/lib/schemas/user"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Monitor, Globe, FileKey, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const stateLabels: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  READY: { label: "준비", variant: "secondary" },
  IN_USE: { label: "사용중", variant: "default" },
  MAINTENANCE: { label: "유지보수", variant: "outline" },
  PENDING_DISPOSAL: { label: "폐기대기", variant: "destructive" },
  DISPOSED: { label: "폐기", variant: "destructive" },
}

const typeLabels: Record<string, string> = {
  TANGIBLE: "유형",
  INTANGIBLE: "무형",
}

function getCategoryIcon(categoryName: string) {
  if (categoryName.includes("노트북")) return Laptop
  if (categoryName.includes("모니터")) return Monitor
  if (categoryName.includes("도메인")) return Globe
  if (categoryName.includes("SSL") || categoryName.includes("인증서")) return FileKey
  return Monitor
}

interface AssetsTableProps {
  assets: Asset[]
  categories: Category[]
  users: User[]
}

export function AssetsTable({ assets, categories, users }: AssetsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>자산명</TableHead>
            <TableHead>카테고리</TableHead>
            <TableHead>유형</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>담당자</TableHead>
            <TableHead>등록일</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset) => {
            const category = categories.find((c) => c.id === asset.categoryId)
            const assignee = asset.assigneeId ? users.find((u) => u.id === asset.assigneeId) : null
            const CategoryIcon = getCategoryIcon(category?.name || "")
            const state = stateLabels[asset.state]

            return (
              <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                      <CategoryIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{asset.name}</p>
                      <p className="text-xs text-muted-foreground">{asset.description}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{category?.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{typeLabels[asset.type]}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={state.variant}>{state.label}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{assignee ? assignee.name : "-"}</TableCell>
                <TableCell className="text-muted-foreground">{asset.createdAt.toLocaleDateString("ko-KR")}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>상세보기</DropdownMenuItem>
                      <DropdownMenuItem>수정</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">삭제</DropdownMenuItem>
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
