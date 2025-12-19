"use client"

import { useState } from "react"
import { Search, Plus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function TicketsFilters() {
  const [search, setSearch] = useState("")

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="티켓 검색..."
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
            <SelectItem value="open">열림</SelectItem>
            <SelectItem value="in_progress">진행중</SelectItem>
            <SelectItem value="completed">완료</SelectItem>
            <SelectItem value="rejected">거절</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="우선순위" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">모든 우선순위</SelectItem>
            <SelectItem value="urgent">긴급</SelectItem>
            <SelectItem value="high">높음</SelectItem>
            <SelectItem value="medium">보통</SelectItem>
            <SelectItem value="low">낮음</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      <Button size="sm">
        <Plus className="mr-2 h-4 w-4" />
        티켓 생성
      </Button>
    </div>
  )
}
