import { atom } from "recoil"
import { Api } from "@services/api"
import { Environment } from "@config/environment"

export const apiConfig = atom<Api>({
  key: "apiConfig",
  default: new Environment().api,
})
export const isAppReady = atom<boolean>({
  key: "apiLoadStatus",
  default: false,
})
