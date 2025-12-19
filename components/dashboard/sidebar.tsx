"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Box, Ticket, Building2, Users, Settings, Key, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useAuth } from "@/lib/auth-context"

const navigation = [
  { name: "대시보드", href: "/", icon: LayoutDashboard },
  { name: "자산 관리", href: "/assets", icon: Box },
  { name: "티켓", href: "/tickets", icon: Ticket },
]

const adminNavigation = [
  { name: "조직 관리", href: "/admin/organizations", icon: Building2 },
  { name: "사용자 관리", href: "/admin/users", icon: Users },
  { name: "API 관리", href: "/admin/api", icon: Key },
  { name: "설정", href: "/admin/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || '사용자'
  const userEmail = user?.email || ''
  const userInitial = userName.charAt(0).toUpperCase()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Box className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">AssetFlow</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}

          {/* Admin Section */}
          <Collapsible defaultOpen={true}>
            <CollapsibleTrigger className="mt-6 flex w-full items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground group">
              관리
              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </CollapsibleContent>
          </Collapsible>
        </nav>

        {/* User */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
              {userInitial}
            </div>
            <div className="flex-1 truncate">
              <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
