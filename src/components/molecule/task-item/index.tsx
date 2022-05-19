import React, { FC, useCallback, memo } from "react"
import { Text } from "react-native"
import type { Task } from "@stores/task/type"

// Hooks
import { useModalTask } from "@hooks"
import { useTask } from "@stores"

// Components
import { Checkmark, Card } from "@components/atom"

// Styles
import styles from "./styles"
import { apply } from "@theme"

// Component Props
export interface TaskItemProps {
  item: Task
}

export const TaskItem: FC<TaskItemProps> = memo((props) => {
  const { item } = props
  const { setCurrentTask, modalToggle } = useModalTask()
  const { updateTask } = useTask()

  // Toggle check
  const toggleCheck = useCallback(() => {
    updateTask({
      ...item,
      completed: !item.completed,
    })
  }, [item, updateTask])

  // onEdit task
  const onEdit = useCallback(() => {
    setCurrentTask(item)
    modalToggle()
  }, [item])

  return (
    <Card cardStyle={styles.container} onPress={toggleCheck} onLongPress={onEdit}>
      <Checkmark
        checked={item.completed}
        containerStyle={[
          apply(`border-${item.category.color}`),
          item.completed && apply(`bg-${item.category.color}`),
        ]}
      />
      <Text style={styles.title}>{item.title}</Text>
    </Card>
  )
})
