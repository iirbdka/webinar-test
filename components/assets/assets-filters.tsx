"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddAssetDialog } from "./add-asset-dialog"
import type { Category } from "@/lib/schemas/asset"
import type { User } from "@/lib/schemas/user"

interface AssetsFiltersProps {
  categories: Category[]
  users: User[]
  onAssetAdded: () => void
}

export function AssetsFilters({ categories, users, onAssetAdded }: AssetsFiltersProps) {
  const [search, setSearch] = useState("")

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="자산 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 상태</SelectItem>
            <SelectItem value="ready">준비</SelectItem>
            <SelectItem value="in_use">사용중</SelectItem>
            <SelectItem value="maintenance">유지보수</SelectItem>
            <SelectItem value="disposed">폐기</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 유형</SelectItem>
            <SelectItem value="tangible">유형자산</SelectItem>
            <SelectItem value="intangible">무형자산</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          내보내기
        </Button>
        <AddAssetDialog categories={categories} users={users} onAssetAdded={onAssetAdded} />
      </div>
    </div>
  )
}
