import { useCallback } from "react"
import { atom, useRecoilState } from "recoil"
import type { Task } from "@stores/task/type"

// Initial Atom
const atomModalTaskShow = atom<boolean>({
  key: "atom_modalTaskShow",
  default: false,
})

const atomModalCurrentTask = atom<Task>({
  key: "atom_modalCurrentTask",
  default: null,
})

export const useModalTask = () => {
  const [isModalShow, setIsModalShow] = useRecoilState(atomModalTaskShow)
  const [currentTask, setCurrentTask] = useRecoilState(atomModalCurrentTask)

  // Modal toggler
  const modalToggle = useCallback(() => {
    if (isModalShow) setCurrentTask(null)

    setIsModalShow(!isModalShow)
  }, [isModalShow])

  return {
    isModalShow,
    modalToggle,
    currentTask,
    setCurrentTask,
  }
}
