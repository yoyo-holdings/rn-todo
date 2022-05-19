import { useCallback } from "react"
import { atom, useRecoilState } from "recoil"
import type { Task } from "./type"

// INITIAL STATE
const atomTaskList = atom<Task[]>({
  key: "atom_taskList",
  default: [],
})

// Store Hooks
export const useTask = () => {
  const [taskList, setTaskList] = useRecoilState(atomTaskList)

  /**
   * Add task function
   */
  const addTask = useCallback(
    (newTask: Task) => {
      setTaskList([newTask, ...taskList])
    },
    [taskList],
  )

  /**
   * Update task function
   */
  const updateTask = useCallback(
    (newData: Task) => {
      setTaskList(taskList.map((item) => (item.id === newData.id ? newData : item)))
    },
    [taskList],
  )

  /**
   * Delete task function
   */
  const deleteTask = useCallback(
    (taskId: string) => {
      setTaskList(taskList.filter((item) => item.id !== taskId))
    },
    [taskList],
  )

  return {
    taskList,
    addTask,
    updateTask,
    deleteTask,
  }
}
