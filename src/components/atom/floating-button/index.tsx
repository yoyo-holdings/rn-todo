import React, { FC, memo } from "react"
import { TouchableOpacity } from "react-native"
import { useModalTask } from "@hooks"

// Icons
import { IconPlus } from "@svg"

// Styles
import styles from "./styles"

// Component Props
export interface FloatingButtonProps {}

export const FloatingButton: FC<FloatingButtonProps> = memo(() => {
  const { modalToggle } = useModalTask()

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={() => modalToggle()}>
      <IconPlus width={30} height={30} />
    </TouchableOpacity>
  )
})
