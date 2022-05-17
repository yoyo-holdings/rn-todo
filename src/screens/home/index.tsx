import React, { FC, useEffect } from "react"
import { ActivityIndicator, View, Text } from "react-native"
import { RootStackScreenProps } from "@navigations/stack/types"
import { useCharacters } from "@stores"

import styles from "./style"
import { apply } from "@theme"

const Home: FC<RootStackScreenProps<"Main">> = () => {
  const { fetching, getCharacters } = useCharacters()

  useEffect(() => {
    ;(async () => {
      await getCharacters()
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      {fetching && <ActivityIndicator color={apply("red-500")} />}
    </View>
  )
}

export default Home
