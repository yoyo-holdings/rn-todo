import React, { useState, useEffect } from "react";
import TodoList from "../Component/TodoList";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export const SelectedNoteScreen = ({ route }) => {
  const { title, otherParam } = route.params.title;
  const [value, onChangeText] = useState(route.params.text);


  return (
    <View style={{ marginHorizontal: "4%" }}>
      <Text>{title}</Text>
      <TextInput
        multiline
        onChangeText={(text) => onChangeText(text)}
        value={value}
        
      />
    </View>
  );
};
