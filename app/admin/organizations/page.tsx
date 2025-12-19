import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { OrgUnitsTable } from "@/components/admin/org-units-table"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getOrgUnits } from "@/lib/api/users"

export default async function OrganizationsPage() {
  const orgUnits = await getOrgUnits()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">조직 관리</h1>
            <p className="text-sm text-muted-foreground">회사의 부서 및 조직 구조를 관리합니다</p>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="조직 검색..." className="pl-9" />
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              조직 추가
            </Button>
          </div>
          <OrgUnitsTable orgUnits={orgUnits} />
        </main>
      </div>
    </div>
  )
}
