import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { UsersTable } from "@/components/admin/users-table"
import { Plus, Search, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getUsers } from "@/lib/api/users"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">사용자 관리</h1>
            <p className="text-sm text-muted-foreground">사용자 계정 및 권한을 관리합니다</p>
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="사용자 검색..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                초대하기
              </Button>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                사용자 추가
              </Button>
            </div>
          </div>
          <UsersTable users={users} />
        </main>
      </div>
    </div>
  )
}
