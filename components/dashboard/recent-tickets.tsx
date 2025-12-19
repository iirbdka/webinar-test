import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Ticket } from "@/lib/schemas/ticket"
import type { User } from "@/lib/schemas/user"
import { cn } from "@/lib/utils"

interface RecentTicketsProps {
  tickets: Ticket[]
  users: User[]
}

const statusStyles = {
  OPEN: { label: "열림", className: "bg-chart-2/20 text-chart-2 border-chart-2/30" },
  IN_PROGRESS: { label: "진행중", className: "bg-chart-1/20 text-chart-1 border-chart-1/30" },
  COMPLETED: { label: "완료", className: "bg-muted text-muted-foreground border-muted" },
  REJECTED: { label: "반려", className: "bg-chart-4/20 text-chart-4 border-chart-4/30" },
}

const priorityStyles = {
  LOW: { label: "낮음", className: "text-muted-foreground" },
  MEDIUM: { label: "보통", className: "text-chart-2" },
  HIGH: { label: "높음", className: "text-chart-3" },
  URGENT: { label: "긴급", className: "text-chart-4" },
}

export function RecentTickets({ tickets, users }: RecentTicketsProps) {
  const getUserById = (id: string) => users.find((u) => u.id === id)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium text-card-foreground">최근 티켓</CardTitle>
        <a href="/tickets" className="text-sm text-primary hover:underline">
          전체보기
        </a>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {tickets.slice(0, 4).map((ticket) => {
            const requester = getUserById(ticket.requesterId)
            const status = statusStyles[ticket.status]
            const priority = priorityStyles[ticket.priority]

            return (
              <div
                key={ticket.id}
                className="rounded-lg border border-border bg-secondary/30 p-3 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-card-foreground">{ticket.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarFallback className="bg-secondary text-xs text-muted-foreground">
                          {requester?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{requester?.name}</span>
                      <span className={cn("text-xs", priority.className)}>• {priority.label}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className={cn("shrink-0", status.className)}>
                    {status.label}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
