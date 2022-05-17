import React from "react"
import { Platform } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createStackNavigator } from "@react-navigation/stack"
import { AppParamList } from "./types"

import HomeScreen from "@screens/home"

const createStackNav = Platform.OS === "ios" ? createNativeStackNavigator : createStackNavigator

const Stack = createStackNav<AppParamList>()

export const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        headerTitleAlign: "center",
        cardOverlayEnabled: false,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        }),
      }}
    >
      <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
