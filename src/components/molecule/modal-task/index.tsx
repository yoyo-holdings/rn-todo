import React, { FC, useEffect, useState, useCallback, memo } from "react"
import {
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Platform,
  Pressable,
  Modal,
  View,
  Text,
} from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import "react-native-get-random-values"
import { v4 as uuid } from "uuid"
import type { Category } from "@stores/category/type"

// Hooks
import { useModalTask } from "@hooks"
import { useCategory, useTask } from "@stores"

// Components
import { Button } from "@components/atom"
import { CategoryHorizontal } from "@components/molecule"

// Styles
import styles from "./styles"
import { apply } from "@theme"

// Component Props
export interface ModalTaskProps {}

export const ModalTask: FC<ModalTaskProps> = memo((props) => {
  const { isModalShow, currentTask, modalToggle } = useModalTask()
  const { categoryList } = useCategory()
  const { addTask, updateTask, deleteTask } = useTask()
  const [task, setTask] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<Category>(categoryList[0])
  const [localShow, setLocalShow] = useState(false)
  const modalPosition = useSharedValue(400)

  useEffect(() => {
    if (currentTask !== null) {
      setTask(currentTask.title)
    } else {
      setTask("")
    }

    if (!localShow && isModalShow) {
      setLocalShow(true)
      modalPosition.value = withTiming(0, { duration: 250 })
    }

    if (localShow && !isModalShow) {
      modalPosition.value = withTiming(400, { duration: 250 })
      setTimeout(() => setLocalShow(false), 250)
    }
  }, [isModalShow, localShow, currentTask])

  // Animated styles
  const animatedPositionStyles = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: modalPosition.value,
      },
    ],
  }))

  // Handle submit task
  const onSave = useCallback(() => {
    if (currentTask) {
      updateTask({
        ...currentTask,
        title: task,
        category: selectedCategory,
      })
    } else {
      addTask({
        id: uuid(),
        title: task,
        completed: false,
        createdAt: new Date().getTime(),
        category: selectedCategory,
      })
    }

    modalToggle()
  }, [task, selectedCategory, currentTask, updateTask])

  // Handle delete task
  const onDelete = useCallback(() => {
    deleteTask(currentTask.id)
    modalToggle()
  }, [currentTask, modalToggle])

  return (
    <Modal visible={localShow} onRequestClose={() => modalToggle()} hardwareAccelerated transparent>
      <KeyboardAvoidingView
        style={apply("flex")}
        behavior={Platform.OS === "ios" ? "height" : null}
        keyboardVerticalOffset={0}
      >
        <Pressable style={styles.backdrop} onPress={() => modalToggle()} />

        <Animated.View style={[styles.panel, animatedPositionStyles]}>
          <View style={styles.panelHeader}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => modalToggle()}>
              <Text style={styles.panelHeaderText}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.panelHeaderTitle}>Add New Task</Text>

            {currentTask !== null ? (
              <TouchableOpacity activeOpacity={0.8} onPress={() => onDelete()}>
                <Text style={[styles.panelHeaderText, styles.panelDeleteText]}>Delete</Text>
              </TouchableOpacity>
            ) : (
              <View style={apply("mr-3")} />
            )}
          </View>

          <View style={apply("flex")}>
            <TextInput
              defaultValue={task}
              onChangeText={(val) => setTask(val)}
              placeholder="Write task here..."
              placeholderTextColor={apply("gray-400")}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={5}
              style={apply("flex")}
            />
          </View>

          <View>
            <CategoryHorizontal
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
            <Button title="Save" disabled={task === ""} onPress={onSave} />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
})
