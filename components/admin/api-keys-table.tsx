"use client"

import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontal, Key, Copy, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useState } from "react"

const mockApiKeys = [
  {
    id: "1",
    name: "프로덕션 키",
    key: "af_prod_sk_xxxxxxxxxxxxxxxxxxxx",
    status: "active",
    lastUsed: new Date("2024-11-24"),
    createdAt: new Date("2024-06-15"),
  },
  {
    id: "2",
    name: "개발 키",
    key: "af_dev_sk_xxxxxxxxxxxxxxxxxxxx",
    status: "active",
    lastUsed: new Date("2024-11-20"),
    createdAt: new Date("2024-08-01"),
  },
  {
    id: "3",
    name: "테스트 키",
    key: "af_test_sk_xxxxxxxxxxxxxxxxxxxx",
    status: "inactive",
    lastUsed: new Date("2024-10-05"),
    createdAt: new Date("2024-09-10"),
  },
]

export function ApiKeysTable() {
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())

  const toggleKeyVisibility = (id: string) => {
    const newSet = new Set(visibleKeys)
    if (newSet.has(id)) {
      newSet.delete(id)
    } else {
      newSet.add(id)
    }
    setVisibleKeys(newSet)
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>이름</TableHead>
            <TableHead>API 키</TableHead>
            <TableHead>상태</TableHead>
            <TableHead>마지막 사용</TableHead>
            <TableHead>생성일</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockApiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                    <Key className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{apiKey.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <code className="text-sm text-muted-foreground font-mono">
                    {visibleKeys.has(apiKey.id) ? apiKey.key : "af_••••••••••••••••••••"}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => toggleKeyVisibility(apiKey.id)}
                  >
                    {visibleKeys.has(apiKey.id) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={apiKey.status === "active" ? "default" : "secondary"}>
                  {apiKey.status === "active" ? "활성" : "비활성"}
                </Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">{apiKey.lastUsed.toLocaleDateString("ko-KR")}</TableCell>
              <TableCell className="text-muted-foreground">{apiKey.createdAt.toLocaleDateString("ko-KR")}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>키 재생성</DropdownMenuItem>
                    <DropdownMenuItem>이름 변경</DropdownMenuItem>
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
