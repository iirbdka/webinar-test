"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { AssetsTable } from "@/components/assets/assets-table"
import { AssetsFilters } from "@/components/assets/assets-filters"
import type { Asset, Category } from "@/lib/schemas/asset"
import type { User } from "@/lib/schemas/user"
import { Skeleton } from "@/components/ui/skeleton"

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const [assetsModule, categoriesModule, usersModule] = await Promise.all([
        import("@/lib/api/client/assets").then((m) => m.getAssets()),
        import("@/lib/api/client/assets").then((m) => m.getCategories()),
        import("@/lib/api/client/users").then((m) => m.getUsers()),
      ])
      setAssets(assetsModule)
      setCategories(categoriesModule)
      setUsers(usersModule)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">자산 관리</h1>
            <p className="text-sm text-muted-foreground">회사의 모든 자산을 관리합니다</p>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <>
              <AssetsFilters categories={categories} users={users} onAssetAdded={fetchData} />
              <AssetsTable assets={assets} categories={categories} users={users} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
