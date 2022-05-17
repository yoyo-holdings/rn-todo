import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParameterList extends AppParamList {}
  }
}

export type AppParamList = {
  Main: undefined
}

export type RootStackScreenProps<Screen extends keyof AppParamList> = NativeStackScreenProps<
  AppParamList,
  Screen
>

export type RootStackNavProps<Screen extends keyof AppParamList> = NativeStackNavigationProp<
  AppParamList,
  Screen
>
