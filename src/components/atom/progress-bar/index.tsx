import React, { FC, memo } from "react"
import { StyleProp, ViewStyle, View } from "react-native"

// Styles
import styles from "./styles"
import { apply } from "@theme"

// Component Props
export interface ProgressBarProps {
  containerStyle?: StyleProp<ViewStyle>
  tintColor: string
  percentage: number
}

export const ProgressBar: FC<ProgressBarProps> = memo((props) => {
  const { percentage, tintColor, containerStyle } = props

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.activeProgress, apply(`w%${percentage} bg-${tintColor}`)]} />
    </View>
  )
})
