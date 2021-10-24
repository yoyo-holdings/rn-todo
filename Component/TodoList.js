import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const TodoList = (props) => {
  const [status, setStatus] = useState(props.todo.status);
  const [entryValue, setEntryValue] = useState(props.todo.entry);
  const [editMode, setEditMode] = useState(props.editMode);

  const onChangeChecked = () => {
    status ? setStatus(false) : setStatus(true);
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={{ marginLeft: "10%", fontSize: 30 }}
        onChangeText={(entryValue) => setEntryValue(entryValue)}
        value={entryValue}
      />
      <View>
        <TouchableOpacity onPress={() => onChangeChecked()}>
          <Text>{status.toString()}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoList;
