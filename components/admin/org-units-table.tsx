"use client"

import type { OrgUnit } from "@/lib/schemas/user"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface OrgUnitsTableProps {
  orgUnits: OrgUnit[]
}

export function OrgUnitsTable({ orgUnits }: OrgUnitsTableProps) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>조직명</TableHead>
            <TableHead>상위 조직</TableHead>
            <TableHead>회사</TableHead>
            <TableHead>등록일</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orgUnits.map((orgUnit) => (
            <TableRow key={orgUnit.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Building2 className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{orgUnit.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {orgUnit.parentId ? orgUnits.find((o) => o.id === orgUnit.parentId)?.name : "-"}
              </TableCell>
              <TableCell className="text-muted-foreground">Acme Corporation</TableCell>
              <TableCell className="text-muted-foreground">{orgUnit.createdAt.toLocaleDateString("ko-KR")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>수정</DropdownMenuItem>
                    <DropdownMenuItem>하위 조직 추가</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">삭제</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
