import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Laptop, Monitor, Globe, Shield, Sparkles } from "lucide-react"
import type { Asset } from "@/lib/schemas/asset"
import { cn } from "@/lib/utils"

interface RecentAssetsProps {
  assets: Asset[]
}

const categoryIcons: Record<string, typeof Laptop> = {
  "cat1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5": Laptop,
  "cat2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6": Monitor,
  "cat3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7": Globe,
  "cat4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8": Shield,
  "cat5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9": Sparkles,
}

const stateStyles = {
  READY: { label: "준비중", className: "bg-chart-2/20 text-chart-2 border-chart-2/30" },
  IN_USE: { label: "사용중", className: "bg-chart-1/20 text-chart-1 border-chart-1/30" },
  MAINTENANCE: { label: "유지보수", className: "bg-chart-3/20 text-chart-3 border-chart-3/30" },
  PENDING_DISPOSAL: { label: "폐기예정", className: "bg-chart-4/20 text-chart-4 border-chart-4/30" },
  DISPOSED: { label: "폐기", className: "bg-muted text-muted-foreground border-muted" },
}

export function RecentAssets({ assets }: RecentAssetsProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">최근 자산</CardTitle>
        <a href="/assets" className="text-sm text-primary hover:underline">
          전체보기
        </a>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {assets.slice(0, 5).map((asset) => {
            const Icon = categoryIcons[asset.categoryId] || Laptop
            const state = stateStyles[asset.state]

            return (
              <div
                key={asset.id}
                className="flex items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-card-foreground">{asset.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{asset.description}</p>
                </div>
                <Badge variant="outline" className={cn("shrink-0", state.className)}>
                  {state.label}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
