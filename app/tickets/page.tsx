import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TicketsTable } from "@/components/tickets/tickets-table"
import { TicketsFilters } from "@/components/tickets/tickets-filters"
import { getTickets } from "@/lib/api/tickets"
import { getUsers } from "@/lib/api/users"
import { getAssets } from "@/lib/api/assets"

export default async function TicketsPage() {
  const [tickets, users, assets] = await Promise.all([
    getTickets(),
    getUsers(),
    getAssets(),
  ])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">티켓</h1>
            <p className="text-sm text-muted-foreground">자산 관련 요청 및 문의를 관리합니다</p>
          </div>
          <TicketsFilters />
          <TicketsTable tickets={tickets} users={users} assets={assets} />
        </main>
      </div>
    </div>
  )
}
