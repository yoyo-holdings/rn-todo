import React, { FC, useMemo, useEffect } from "react"
import { FlatList, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { RootStackScreenProps } from "@navigations/stack/types"

// Hooks
import { useTask } from "@stores"

// Components
import { FloatingButton } from "@components/atom"
import { ModalTask, TaskItem, TodayProgress } from "@components/molecule"

// Styles
import styles from "./styles"

const Home: FC<RootStackScreenProps<"Main">> = () => {
  const { taskList } = useTask()

  // Empty state
  const emptyState = useMemo(
    () => (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>You don't have any task today.</Text>
      </View>
    ),
    [],
  )

  // Today's tasks
  const todayTasks = useMemo(
    () => taskList.filter((task) => task.category.id === "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"),
    [taskList],
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={todayTasks}
        extraData={taskList}
        keyExtractor={(_, index) => index.toString()}
        initialNumToRender={4}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.heroTitle}>Hola~!</Text>

            <View style={styles.todayHeaderSection}>
              <Text style={styles.titleSection}>TODAY'S TASKS</Text>
              <TodayProgress />
            </View>
          </View>
        )}
        renderItem={({ item }) => <TaskItem item={item} />}
        ListFooterComponent={() => (taskList.length === 0 ? emptyState : null)}
      />

      <FloatingButton />
      <ModalTask />
    </SafeAreaView>
  )
}

export default Home
