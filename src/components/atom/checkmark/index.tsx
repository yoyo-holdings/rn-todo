import React, { FC, memo } from "react"
import { Pressable, StyleProp, ViewStyle } from "react-native"

// Icons
import { IconCheck } from "@svg"

// Styles
import styles from "./styles"

// Component Props
export interface CheckmarkProps {
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => void
  checked?: boolean
}

export const Checkmark: FC<CheckmarkProps> = memo((props) => {
  const { checked, onPress, containerStyle } = props

  return (
    <Pressable style={[styles.container, containerStyle]} onPress={() => onPress?.()}>
      {checked && <IconCheck width={14} height={14} />}
    </Pressable>
  )
})
