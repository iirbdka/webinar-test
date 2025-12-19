import { Box, Ticket, AlertTriangle, Activity } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { DashboardSummary } from "@/lib/schemas/dashboard"

interface StatCardsProps {
  summary: DashboardSummary
}

export function StatCards({ summary }: StatCardsProps) {
  const stats = [
    {
      name: "전체 자산",
      value: summary.totalAssets,
      subtext: `유형 ${summary.assetsByType.tangible} / 무형 ${summary.assetsByType.intangible}`,
      icon: Box,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      name: "진행 중 티켓",
      value: summary.ticketsByStatus.open + summary.ticketsByStatus.inProgress,
      subtext: `열림 ${summary.ticketsByStatus.open} / 진행 ${summary.ticketsByStatus.inProgress}`,
      icon: Ticket,
      color: "text-chart-2",
      bgColor: "bg-chart-2/10",
    },
    {
      name: "만료 예정",
      value: summary.expiringAssets,
      subtext: "30일 이내",
      icon: AlertTriangle,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      name: "최근 활동",
      value: summary.recentActivity,
      subtext: "지난 7일",
      icon: Activity,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="border-border bg-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <p className="mt-1 text-3xl font-semibold text-card-foreground">{stat.value.toLocaleString()}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.subtext}</p>
              </div>
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
