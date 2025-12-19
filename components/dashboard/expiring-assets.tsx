import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Calendar } from "lucide-react"
import type { Asset } from "@/lib/schemas/asset"
import { differenceInDays, format } from "date-fns"
import { ko } from "date-fns/locale"

interface ExpiringAssetsProps {
  assets: Asset[]
}

export function ExpiringAssets({ assets }: ExpiringAssetsProps) {
  const expiringAssets = assets
    .filter((asset) => asset.intangibleFields?.expiryDate)
    .map((asset) => {
      const expiryDate = asset.intangibleFields!.expiryDate!
      const daysUntilExpiry = differenceInDays(expiryDate, new Date())
      return { ...asset, expiryDate, daysUntilExpiry }
    })
    .filter((asset) => asset.daysUntilExpiry <= 90 && asset.daysUntilExpiry > 0)
    .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-chart-3" />
          <CardTitle className="text-base font-medium text-card-foreground">만료 예정</CardTitle>
        </div>
        <Badge variant="outline" className="bg-chart-3/10 text-chart-3 border-chart-3/30">
          {expiringAssets.length}개
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        {expiringAssets.length === 0 ? (
          <p className="text-sm text-muted-foreground">90일 내 만료 예정 자산이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {expiringAssets.slice(0, 4).map((asset) => (
              <div
                key={asset.id}
                className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-card-foreground">{asset.name}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {format(asset.expiryDate, "yyyy년 M월 d일", { locale: ko })}
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    asset.daysUntilExpiry <= 30
                      ? "bg-chart-4/20 text-chart-4 border-chart-4/30"
                      : "bg-chart-3/20 text-chart-3 border-chart-3/30"
                  }
                >
                  D-{asset.daysUntilExpiry}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
