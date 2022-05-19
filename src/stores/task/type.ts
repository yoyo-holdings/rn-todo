import type { Category } from "@stores/category/type"

export type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: number
  category?: Category
}
