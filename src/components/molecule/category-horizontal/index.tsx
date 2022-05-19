import React, { FC, memo } from "react"
import { ScrollView } from "react-native"
import type { Category } from "@stores/category/type"

// Hooks
import { useCategory } from "@stores"

// Components
import { CategoryItem } from "@components/atom"

// Styles
import styles from "./styles"
import { apply } from "@theme"

// Component Props
export interface CategoryHorizontalProps {
  selectedCategory: Category
  onSelect: (item: Category) => void
}

export const CategoryHorizontal: FC<CategoryHorizontalProps> = memo((props) => {
  const { selectedCategory, onSelect } = props
  const { categoryList } = useCategory()

  return categoryList.length === 0 ? null : (
    <ScrollView
      contentContainerStyle={styles.container}
      showsHorizontalScrollIndicator={false}
      horizontal
    >
      {categoryList.map((item, index) => (
        <CategoryItem
          key={index}
          item={item}
          onPress={onSelect}
          containerStyle={index === 0 && apply("ml-0")}
          active={selectedCategory.id === item.id}
        />
      ))}
    </ScrollView>
  )
})
