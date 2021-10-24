import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";

export const Home = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        marginHorizontal: "20%",
        gap: 40,
      }}
    >
      <Button onPress={() => navigation.navigate("Todo")} title="Todo" />

      <Button onPress={() => navigation.navigate("Note")} title="Note" />
    </View>
  );
};
