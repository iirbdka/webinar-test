import { Header } from "@/components/dashboard/header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { mockCompany } from "@/lib/mock-data"

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-64">
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">설정</h1>
            <p className="text-sm text-muted-foreground">회사 및 시스템 설정을 관리합니다</p>
          </div>

          <div className="max-w-3xl space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>회사 정보</CardTitle>
                <CardDescription>기본 회사 정보를 관리합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">회사명</Label>
                  <Input id="companyName" defaultValue={mockCompany.name} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">현재 플랜</p>
                    <p className="text-sm text-muted-foreground">사용 중인 구독 플랜입니다</p>
                  </div>
                  <Badge variant="default">{mockCompany.plan}</Badge>
                </div>
                <Button>변경사항 저장</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>알림 설정</CardTitle>
                <CardDescription>이메일 및 시스템 알림을 관리합니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">자산 만료 알림</p>
                    <p className="text-sm text-muted-foreground">자산 만료 전 이메일 알림을 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">티켓 업데이트 알림</p>
                    <p className="text-sm text-muted-foreground">티켓 상태 변경시 알림을 받습니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">주간 리포트</p>
                    <p className="text-sm text-muted-foreground">매주 월요일 자산 현황 리포트를 받습니다</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">위험 구역</CardTitle>
                <CardDescription>이 작업은 되돌릴 수 없습니다</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">모든 데이터 내보내기</p>
                    <p className="text-sm text-muted-foreground">모든 자산 및 티켓 데이터를 내보냅니다</p>
                  </div>
                  <Button variant="outline">내보내기</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">계정 삭제</p>
                    <p className="text-sm text-muted-foreground">모든 데이터가 영구적으로 삭제됩니다</p>
                  </div>
                  <Button variant="destructive">계정 삭제</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
