import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const NoteList = (props) => {
  const [entryValue, setEntryValue] = useState(props.notes.title);

  return (
    <View style={{ flexDirection: "row" }}>
      <TextInput
        style={{ marginLeft: "10%", fontSize: 30 }}
        onChangeText={(entryValue) => setEntryValue(entryValue)}
        value={entryValue}
      />
    </View>
  );
};

export default NoteList;
