import { Sidebar } from "@/components/dashboard/sidebar"
import { Header } from "@/components/dashboard/header"
import { StatCards } from "@/components/dashboard/stat-cards"
import { AssetChart } from "@/components/dashboard/asset-chart"
import { AssetStateChart } from "@/components/dashboard/asset-state-chart"
import { RecentAssets } from "@/components/dashboard/recent-assets"
import { RecentTickets } from "@/components/dashboard/recent-tickets"
import { ExpiringAssets } from "@/components/dashboard/expiring-assets"
import { getDashboardSummary } from "@/lib/api/dashboard"
import { getAssets } from "@/lib/api/assets"
import { getTickets } from "@/lib/api/tickets"
import { getUsers } from "@/lib/api/users"
import { mockAssetTrendData } from "@/lib/mock-data"

export default async function DashboardPage() {
  const [summary, assets, tickets, users] = await Promise.all([
    getDashboardSummary(),
    getAssets(),
    getTickets(),
    getUsers(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header title="대시보드" />
        <main className="p-6">
          {/* Stats */}
          <StatCards summary={summary} />

          {/* Charts Row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <AssetChart data={mockAssetTrendData} />
            <AssetStateChart summary={summary} />
          </div>

          {/* Content Row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <RecentAssets assets={assets} />
            <RecentTickets tickets={tickets} users={users} />
            <ExpiringAssets assets={assets} />
          </div>
        </main>
      </div>
    </div>
  )
}
