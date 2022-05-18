import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  email: '',
  password: '',
}
export const { useGlobalState } = createGlobalState(initialState)