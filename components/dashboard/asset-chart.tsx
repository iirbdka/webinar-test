"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { AssetTrendData } from "@/lib/schemas/dashboard"

interface AssetChartProps {
  data: AssetTrendData[]
}

export function AssetChart({ data }: AssetChartProps) {
  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">자산 현황 추이</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.65 0.15 160)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="oklch(0.65 0.15 160)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }} width={40} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.16 0.005 260)",
                  border: "1px solid oklch(0.25 0.01 260)",
                  borderRadius: "8px",
                  color: "oklch(0.95 0 0)",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="oklch(0.65 0.15 160)"
                strokeWidth={2}
                fill="url(#colorTotal)"
                name="전체 자산"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
