import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { TodoScreen } from "./Screen/TodoScreen";
import { NoteScreen } from "./Screen/NoteScreen";
import { SelectedNoteScreen } from "./Screen/SelectedNoteScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./Component/Home";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Note" component={NoteScreen} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="SelectedNote" component={SelectedNoteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
