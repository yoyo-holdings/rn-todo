import React, { FC, memo } from "react"
import { PressableProps, StyleProp, ViewStyle, Pressable } from "react-native"

// Styles
import styles from "./styles"

// Component Props
export interface CardProps extends PressableProps {
  cardStyle?: StyleProp<ViewStyle>
}

export const Card: FC<CardProps> = memo((props) => {
  const { onPress, cardStyle, onLongPress, children } = props

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={[styles.container, cardStyle]}>
      {children}
    </Pressable>
  )
})
