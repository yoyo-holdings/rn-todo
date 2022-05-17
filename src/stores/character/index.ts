import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import { apiConfig } from "@stores/config"
import { CharacterApi } from "@services/api/character-api"
import { Character } from "./types"

/**
 * Initial State
 */
const _fetching = atom<boolean>({
  key: "characterFetching",
  default: false,
})
const _data = atom<Character[]>({
  key: "characterList",
  default: [],
})
const _error = atom<string>({
  key: "characterError",
  default: "",
})

/**
 * Create custom hooks
 */
export const useCharacters = () => {
  const api = useRecoilValue(apiConfig)
  const [fetching, setFetching] = useRecoilState(_fetching)
  const [data, setData] = useRecoilState(_data)
  const [error, setError] = useRecoilState(_error)

  const getCharacters = useCallback(async () => {
    setFetching(true)

    const characterApi = new CharacterApi(api)
    const result = await characterApi.getCharacters()

    if (result.kind === "ok") {
      setData(result.data)
      setFetching(false)
    } else {
      __DEV__ && console.tron.log("Error =>", result.kind)
      setError(result.kind)
      setFetching(false)
    }
  }, [])

  return {
    fetching,
    data,
    error,
    getCharacters,
  }
}
