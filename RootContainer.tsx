import React, { useEffect } from "react"
import "@utils/ignore-warning"
import { loadString } from "@utils/storage"
import { setI18nConfig } from "@locales"
import { useRecoilState } from "recoil"
import Config from "react-native-config"
import { apiConfig, isAppReady } from "@stores/config"
import { Environment } from "@config/environment"

// Components
import { NetworkLog } from "@components/organism/network-log"

// Navigation
import { NavigationContainer } from "@react-navigation/native"
import { navigationRef } from "@utils/navigation-utilities"
import { AppStack } from "@navigations/stack"

export const RootContainer = () => {
  const [, setApi] = useRecoilState(apiConfig)
  const [isReady, setIsReady] = useRecoilState(isAppReady)

  useEffect(() => {
    ;(async () => {
      const language = await loadString("language")
      setI18nConfig(language || "id", false)

      const env = new Environment()
      await env.setup()
      setApi(env.api)
      setIsReady(true)
    })()
  }, [setApi, setIsReady])

  if (!isReady) return null

  return (
    <NavigationContainer ref={navigationRef}>
      <AppStack />
      {Config.SHOW_NETWORK_LOGGER && !__DEV__ && <NetworkLog />}
    </NavigationContainer>
  )
}
