import React, { FC, memo } from "react"
import { TouchableOpacity, Text } from "react-native"

// Styles
import styles from "./styles"

// Component Props
export interface ButtonProps {
  title: string
  onPress?: () => void
  disabled?: boolean
}

export const Button: FC<ButtonProps> = memo((props) => {
  const { title, disabled, onPress } = props

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.container, disabled && styles.disabled]}
      onPress={() => onPress?.()}
      disabled={disabled}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
})
