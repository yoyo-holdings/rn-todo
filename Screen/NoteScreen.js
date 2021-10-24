import React, { useState, useEffect } from "react";
import NoteList from "../Component/NoteList";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";

export const NoteScreen = ({ navigation }) => {
  const [inputEntry, setInputEntry] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [inputStatus, setInputStatus] = useState(true);
  const [notes, setNotes] = useState([
    { id: 1, title: "My Notes", text: "Notes Description" },
  ]);

  const onEditToggle = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  };

  const addTodo = async () => {
    const todo = todos;
    await setTodos(
      todo.push({ id: todo.length + 1, entry: inputEntry, status: true })
    );
    setTodos(() => todos);
  };

  const deleteTodo = async (selectedTodo) => {
    const newArray = todos.filter((todo) => todo.id !== selectedTodo);
    await setTodos(newArray);
    setTodos(() => newArray);
  };

  const toSelectedNote = (item) => {
    navigation.navigate("SelectedNote", {
      title: item.title,
      text: item.text,
    });
  };

  return (
    <View style={{ marginHorizontal: "4%" }}>
      <TouchableOpacity onPress={() => onEditToggle()}>
        <Text style={{ textAlign: "right", marginRight: "10%" }}>Edit</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => toSelectedNote(item)}
            >
              <NoteList notes={item} />
              {editMode ? (
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              ) : null}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    alignItems: "center",
    alignContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    flexDirection: "row",
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
    width: "90%",
    margin: 5,
    height: 100,
  },
});
