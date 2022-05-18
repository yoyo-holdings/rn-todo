import { createGlobalState } from 'react-hooks-global-state'

const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
}
export const { useGlobalState } = createGlobalState(initialState)
