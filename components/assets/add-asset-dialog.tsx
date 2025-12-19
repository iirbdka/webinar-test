"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Plus, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category } from "@/lib/schemas/asset"
import type { User } from "@/lib/schemas/user"
import { toast } from "sonner"

// Form Schema
const assetFormSchema = z.object({
  name: z.string().min(1, "자산명은 필수입니다"),
  description: z.string().optional(),
  type: z.enum(["TANGIBLE", "INTANGIBLE"], {
    required_error: "자산 유형을 선택해주세요",
  }),
  state: z.enum(["READY", "IN_USE", "MAINTENANCE", "PENDING_DISPOSAL", "DISPOSED"], {
    required_error: "자산 상태를 선택해주세요",
  }),
  categoryId: z.string().uuid("카테고리를 선택해주세요"),
  assigneeId: z.string().uuid().optional().or(z.literal("")),
  orgUnitId: z.string().uuid().optional().or(z.literal("")),
  // Tangible fields
  serialNumber: z.string().optional(),
  purchasePrice: z.coerce.number().optional(),
  purchaseDate: z.string().optional(),
  depreciationRate: z.coerce.number().min(0).max(100).optional(),
  // Intangible fields
  expiryDate: z.string().optional(),
  renewalCycle: z.enum(["MONTHLY", "YEARLY"]).optional(),
  accountInfo: z.string().optional(),
  url: z.string().url("올바른 URL을 입력해주세요").optional().or(z.literal("")),
})

type AssetFormValues = z.infer<typeof assetFormSchema>

interface AddAssetDialogProps {
  categories: Category[]
  users: User[]
  onAssetAdded: () => void
}

export function AddAssetDialog({ categories, users, onAssetAdded }: AddAssetDialogProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "TANGIBLE",
      state: "READY",
      categoryId: "",
      assigneeId: "",
      orgUnitId: "",
      serialNumber: "",
      purchasePrice: "" as any,
      purchaseDate: "",
      depreciationRate: "" as any,
      expiryDate: "",
      renewalCycle: undefined,
      accountInfo: "",
      url: "",
    },
  })

  const assetType = form.watch("type")

  async function onSubmit(values: AssetFormValues) {
    setIsLoading(true)
    try {
      const payload: any = {
        name: values.name,
        description: values.description || null,
        type: values.type,
        state: values.state,
        categoryId: values.categoryId,
        assigneeId: values.assigneeId && values.assigneeId !== "" ? values.assigneeId : null,
        orgUnitId: values.orgUnitId && values.orgUnitId !== "" ? values.orgUnitId : null,
      }

      // Add type-specific fields
      if (values.type === "TANGIBLE") {
        payload.tangibleFields = {
          serialNumber: values.serialNumber || null,
          purchasePrice: values.purchasePrice || null,
          purchaseDate: values.purchaseDate || null,
          depreciationRate: values.depreciationRate || null,
        }
      } else if (values.type === "INTANGIBLE") {
        payload.intangibleFields = {
          expiryDate: values.expiryDate || null,
          renewalCycle: values.renewalCycle || null,
          accountInfo: values.accountInfo || null,
          url: values.url || null,
        }
      }

      const response = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("자산 추가에 실패했습니다")
      }

      toast.success("자산이 추가되었습니다")
      setOpen(false)
      form.reset()
      onAssetAdded()
    } catch (error) {
      console.error("Error creating asset:", error)
      toast.error("자산 추가에 실패했습니다")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          자산 추가
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 자산 추가</DialogTitle>
          <DialogDescription>새로운 자산을 등록합니다</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산명 *</FormLabel>
                    <FormControl>
                      <Input placeholder="MacBook Pro 16" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>설명</FormLabel>
                  <FormControl>
                    <Textarea placeholder="자산에 대한 설명을 입력하세요" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>자산 유형 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="TANGIBLE">유형 자산</SelectItem>
                        <SelectItem value="INTANGIBLE">무형 자산</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>상태 *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="READY">준비</SelectItem>
                        <SelectItem value="IN_USE">사용중</SelectItem>
                        <SelectItem value="MAINTENANCE">유지보수</SelectItem>
                        <SelectItem value="PENDING_DISPOSAL">폐기대기</SelectItem>
                        <SelectItem value="DISPOSED">폐기</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="assigneeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>담당자</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="담당자 선택 (선택사항)" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tangible Asset Fields */}
            {assetType === "TANGIBLE" && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-sm font-semibold">유형 자산 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="serialNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>시리얼 번호</FormLabel>
                        <FormControl>
                          <Input placeholder="SN123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchasePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>구매 가격</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="3000000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="purchaseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>구매일</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="depreciationRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>감가상각률 (%)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="20" min="0" max="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Intangible Asset Fields */}
            {assetType === "INTANGIBLE" && (
              <div className="space-y-4 border-t pt-4">
                <h3 className="text-sm font-semibold">무형 자산 정보</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>만료일</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="renewalCycle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>갱신 주기</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="MONTHLY">월간</SelectItem>
                            <SelectItem value="YEARLY">연간</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accountInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>계정 정보</FormLabel>
                      <FormControl>
                        <Textarea placeholder="계정 관련 정보" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                취소
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                추가
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

