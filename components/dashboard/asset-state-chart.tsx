"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { DashboardSummary } from "@/lib/schemas/dashboard"

interface AssetStateChartProps {
  summary: DashboardSummary
}

export function AssetStateChart({ summary }: AssetStateChartProps) {
  const data = [
    { name: "사용중", value: summary.assetsByState.inUse, color: "oklch(0.65 0.15 160)" },
    { name: "준비중", value: summary.assetsByState.ready, color: "oklch(0.7 0.15 220)" },
    { name: "유지보수", value: summary.assetsByState.maintenance, color: "oklch(0.75 0.15 80)" },
    { name: "폐기예정", value: summary.assetsByState.pendingDisposal, color: "oklch(0.6 0.2 25)" },
    { name: "폐기", value: summary.assetsByState.disposed, color: "oklch(0.5 0 0)" },
  ]

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">자산 상태 분포</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-4">
          <div className="h-[180px] w-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "oklch(0.16 0.005 260)",
                    border: "1px solid oklch(0.25 0.01 260)",
                    borderRadius: "8px",
                    color: "oklch(0.95 0 0)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-muted-foreground">{item.name}</span>
                <span className="ml-auto text-sm font-medium text-card-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
