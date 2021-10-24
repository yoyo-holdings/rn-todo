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

export const SelectedNote = () => {
  return (
    <View>
      <Text> {JSON.stringify(itemId)}</Text>
    </View>
  );
};
