import React, { FC, memo } from "react"
import { TouchableOpacity, StyleProp, ViewStyle, Text } from "react-native"
import type { Category } from "@stores/category/type"

// Styles
import styles from "./styles"
import { apply } from "@theme"

// Component Props
export interface CategoryItemProps {
  containerStyle?: StyleProp<ViewStyle>
  item: Category
  active?: boolean
  onPress?: (item: Category) => void
}

export const CategoryItem: FC<CategoryItemProps> = memo((props) => {
  const { item, active, onPress, containerStyle } = props

  return (
    <TouchableOpacity
      style={[
        styles.container,
        containerStyle,
        apply(`border-${item.color}`),
        active && apply(`bg-${item.color} border-${item.color}`),
      ]}
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <Text style={[styles.title, apply(`text-${item.color}`), active && styles.titleActive]}>
        {item.title}
      </Text>
    </TouchableOpacity>
  )
})
