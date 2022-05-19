import React, { FC, useMemo, memo } from "react"
import { View, Text } from "react-native"

// Hooks
import { useTask, useCategory } from "@stores"

// Components
import { ProgressBar } from "@components/atom"

// Styles
import styles from "./styles"

// Component Props
export interface TodayProgressProps {}

export const TodayProgress: FC<TodayProgressProps> = memo((props) => {
  const { taskList } = useTask()
  const { categoryList } = useCategory()

  // Filter only today's tasks
  const todayTasks = useMemo(
    () => taskList.filter((task) => task.category.id === "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"),
    [taskList],
  )

  // Get total tasks
  const totalTask = useMemo(() => todayTasks.length, [todayTasks])

  // Get total completed tasks in percentage
  const completeTask = useMemo(
    () => todayTasks.filter((task) => task.completed).length,
    [todayTasks],
  )

  // Get today category color
  const progressColor = useMemo(
    () => categoryList.find((category) => category.id === "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"),
    [categoryList],
  )

  // Get percentage progress
  const progressPercentage = useMemo(
    () => (completeTask === 0 ? 0 : (completeTask / totalTask) * 100),
    [completeTask, totalTask],
  )

  return (
    <View style={styles.container}>
      <ProgressBar percentage={progressPercentage} tintColor={progressColor.color} />
      <Text style={styles.summaryText}>
        {completeTask} / {totalTask}
      </Text>
    </View>
  )
})
