import React, { useState, useEffect } from "react";
import TodoList from "../Component/TodoList";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";

export const TodoScreen = () => {
  const [inputEntry, setInputEntry] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [inputStatus, setInputStatus] = useState(true);
  const [todos, setTodos] = useState([
    { id: 1, entry: "Eat", status: false },
    { id: 2, entry: "Do Something", status: true },
    { id: 3, entry: "Do Something Two", status: true },
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

  return (
    <View style={{ marginHorizontal: "4%" }}>
      <TouchableOpacity onPress={() => onEditToggle()}>
        {editMode ? (
          <Text style={{ textAlign: "right", marginRight: "10%" }}>Cancel</Text>
        ) : (
          <Text style={{ textAlign: "right", marginRight: "10%" }}>Edit</Text>
        )}
      </TouchableOpacity>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <TodoList todo={item} editMode={editMode} />
              {editMode ? (
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  <Text>Delete</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          );
        }}
      />
      <View style={styles.card}>
        <TextInput
          editable={inputStatus}
          placeholder="Add Todo"
          onChangeText={(inputEntry) => setInputEntry(inputEntry)}
          value={inputEntry}
          style={{ marginLeft: 50 }}
        />
        <Button title="Add" onPress={() => addTodo()} />
      </View>
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
