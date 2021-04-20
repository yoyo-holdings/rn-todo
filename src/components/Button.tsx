import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  ghost?: boolean;
  handleClick: any;
}

export const Button: React.FC<ButtonProps> = ({ text, handleClick, ghost }) => {
  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={[styles.button, ghost && styles.ghost]}>
        <Text style={[styles.buttonTitle, ghost && styles.ghostText]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "black",
    borderRadius: 0,
    height: 40,
    width: 100,
    justifyContent: "center",
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    lineHeight: 22,
  },
  ghost: {
    backgroundColor: "white",
  },
  ghostText: {
    color: "#D8A771",
  },
});
