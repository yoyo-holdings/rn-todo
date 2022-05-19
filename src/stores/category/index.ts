import { useCallback } from "react"
import { atom, useRecoilState } from "recoil"
import type { Category } from "./type"

// INITIAL STATE
const atomCategoryList = atom<Category[]>({
  key: "atom_categoryList",
  default: [
    {
      id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      title: "Today",
      createdAt: 1652840360000,
      color: "blue-500",
    },
    {
      id: "2c9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      title: "School",
      createdAt: 1652840360000,
      color: "green-500",
    },
    {
      id: "3d9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      title: "Work",
      createdAt: 1652840360000,
      color: "yellow-500",
    },
  ],
})

// Store Hooks
export const useCategory = () => {
  const [categoryList, setCategoryList] = useRecoilState(atomCategoryList)

  /**
   * Add category function
   */
  const addCategory = useCallback(
    (newCategory: Category) => {
      setCategoryList([...categoryList, newCategory])
    },
    [categoryList],
  )

  /**
   * Update task function
   */
  const updateCategory = useCallback(
    (newData: Category, categoryId: string) => {
      setCategoryList(categoryList.map((item) => (item.id === categoryId ? newData : item)))
    },
    [categoryList],
  )

  /**
   * Delete task function
   */
  const deleteCategory = useCallback(
    (categoryId: string) => {
      setCategoryList(categoryList.filter((item) => item.id !== categoryId))
    },
    [categoryList],
  )

  return {
    categoryList,
    addCategory,
    updateCategory,
    deleteCategory,
  }
}
