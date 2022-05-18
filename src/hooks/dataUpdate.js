import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  entities: [],
  entityTitle: '',
  entityText: '',
  updateText: '',
  updateTitle: '',
  isUpdating: false,
  updateIndex: null,
  postView: false,
  disabled: false,
}
export const { useGlobalState } = createGlobalState(initialState)
