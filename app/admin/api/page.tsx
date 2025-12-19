import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { ApiKeysTable } from "@/components/admin/api-keys-table"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">API 관리</h1>
            <p className="text-sm text-muted-foreground">API 키를 생성하고 관리합니다</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>총 API 키</CardDescription>
                <CardTitle className="text-3xl">3</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>이번 달 요청</CardDescription>
                <CardTitle className="text-3xl">12,847</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>요청 한도</CardDescription>
                <CardTitle className="text-3xl">100,000</CardTitle>
              </CardHeader>
            </Card>
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="API 키 검색..." className="pl-9" />
            </div>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />새 API 키 생성
            </Button>
          </div>
          <ApiKeysTable />
        </main>
      </div>
    </div>
  )
}
